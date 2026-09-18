import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScenarioBar } from './components/ScenarioBar';
import { FlightStatusCard } from './components/FlightStatusCard';
import { PolicyInspector } from './components/PolicyInspector';
import { ChatInterface } from './components/ChatInterface';
import { TicketAndAuditDrawer } from './components/TicketAndAuditDrawer';
import { ArchitectureView } from './components/ArchitectureView';
import { InputsAndAssumptionsView } from './components/InputsAndAssumptionsView';
import { AIToolsView } from './components/AIToolsView';
import { ExportTicketModal } from './components/ExportTicketModal';
import { OperationsBoard } from './components/OperationsBoard';
import { 
  playMessageSound, 
  playResolutionSuccessSound, 
  playGuardrailNoticeSound, 
  isSoundEnabled, 
  setSoundEnabled 
} from './utils/audioFeedback';
import { 
  SCENARIOS, 
  CUSTOMER_PROFILES, 
  BOOKING_DATA 
} from './data/airlineData';
import { 
  ScenarioDefinition, 
  ChatMessage, 
  StructuredTicket, 
  AuditLogEntry 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'agent' | 'architecture' | 'inputs' | 'tools'>('agent');
  const [currentScenario, setCurrentScenario] = useState<ScenarioDefinition>(SCENARIOS[0]);
  const [subMode, setSubMode] = useState<'chat' | 'operations'>('chat');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [ticket, setTicket] = useState<StructuredTicket>({
    ticketId: 'TKT-SK4821X-0923',
    createdAt: '23 Sep 2026, 18:45 IST',
    customerName: 'Priya Nair',
    pnr: 'SK4821X',
    loyaltyTier: 'Gold',
    flightNumber: 'SK-204',
    disruptionType: 'CANCELLATION',
    resolutionStatus: 'OPEN',
    actionsAuthorized: []
  });
  const [auditTrail, setAuditTrail] = useState<AuditLogEntry[]>([]);
  const [activePolicyNames, setActivePolicyNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize scenario state
  const initializeScenario = (scenario: ScenarioDefinition) => {
    setCurrentScenario(scenario);
    setActivePolicyNames([]);

    const timestamp = '18:45 IST';
    const initCustomerMsg: ChatMessage = {
      id: `msg-${Date.now()}-1`,
      sender: 'customer',
      text: scenario.initialCustomerMessage,
      timestamp,
      sentiment: scenario.id === 'scenario-1' ? 'Furious / Hostile' : 'Frustrated'
    };

    setMessages([initCustomerMsg]);

    const disruption = 
      scenario.id === 'scenario-1' ? 'CANCELLATION' :
      scenario.id === 'scenario-2' ? 'DELAY_4H' : 'DELAY_6H';

    const flightNum = 
      scenario.id === 'scenario-1' ? 'SK-204' :
      scenario.id === 'scenario-2' ? 'SK-118' : 'SK-305';

    setTicket({
      ticketId: `TKT-${scenario.pnr}-0923`,
      createdAt: `23 Sep 2026, ${timestamp}`,
      customerName: scenario.customerName,
      pnr: scenario.pnr,
      loyaltyTier: scenario.loyaltyTier,
      flightNumber: flightNum,
      disruptionType: disruption,
      resolutionStatus: 'OPEN',
      actionsAuthorized: []
    });

    const initAudit: AuditLogEntry = {
      id: `audit-${Date.now()}-1`,
      timestamp: '23 Sep 2026 18:45:00',
      eventType: 'INTENT_DETECTED',
      description: `Inbound customer session opened by ${scenario.customerName} (${scenario.loyaltyTier}) for PNR ${scenario.pnr}`,
      allowed: true
    };

    setAuditTrail([initAudit]);
  };

  useEffect(() => {
    initializeScenario(SCENARIOS[0]);
  }, []);

  const handleSelectScenario = (scenario: ScenarioDefinition) => {
    initializeScenario(scenario);
  };

  const handleResetCurrentScenario = () => {
    initializeScenario(currentScenario);
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  const handleSendMessage = async (text: string) => {
    playMessageSound();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
    
    // Add customer message
    const customerMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'customer',
      text,
      timestamp: timeNow
    };

    const updatedHistory = [...messages, customerMsg];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: currentScenario.id,
          customerPnr: currentScenario.pnr,
          conversationHistory: updatedHistory,
          newMessage: text
        })
      });

      const json = await res.json();

      if (json.success && json.data) {
        const data = json.data;

        // Sound trigger based on resolution vs guardrail
        if (data.isEscalated) {
          playGuardrailNoticeSound();
        } else if (data.actionsTaken && data.actionsTaken.length > 0) {
          playResolutionSuccessSound();
        } else {
          playMessageSound();
        }

        // Add agent response
        const agentMsg: ChatMessage = {
          id: `msg-${Date.now()}-agent`,
          sender: 'agent',
          text: data.reply,
          timestamp: timeNow,
          intentDetected: data.intent,
          policiesUsed: data.policiesUsed,
          actionsTaken: data.actionsTaken,
          isEscalated: data.isEscalated,
          escalationReason: data.escalationReason
        };

        setMessages((prev) => [...prev, agentMsg]);
        setActivePolicyNames(data.policiesUsed || []);

        // Update Structured Ticket
        if (data.ticketUpdate) {
          setTicket((prev) => ({
            ...prev,
            resolutionStatus: data.ticketUpdate.status || prev.resolutionStatus,
            actionsAuthorized: Array.from(new Set([...prev.actionsAuthorized, ...(data.ticketUpdate.actionsAuthorized || [])])),
            rebookingDetails: data.ticketUpdate.rebookingDetails || prev.rebookingDetails,
            vouchersIssued: Array.from(new Set([...(prev.vouchersIssued || []), ...(data.ticketUpdate.vouchersIssued || [])])),
            refundStatus: data.ticketUpdate.refundStatus || prev.refundStatus,
            escalationReason: data.ticketUpdate.escalationReason || data.escalationReason || prev.escalationReason
          }));
        }

        // Update Audit Trail
        if (data.auditEntries && Array.isArray(data.auditEntries)) {
          const newEntries: AuditLogEntry[] = data.auditEntries.map((e: any, i: number) => ({
            id: `audit-${Date.now()}-${i}`,
            timestamp: `23 Sep 2026 ${new Date().toLocaleTimeString()}`,
            eventType: e.eventType,
            description: e.description,
            policyCited: e.policyCited,
            allowed: e.allowed
          }));
          setAuditTrail((prev) => [...prev, ...newEntries]);
        }
      }
    } catch (_err) {
      // Graceful customer notification if network request fails
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now()}-fallback`,
        sender: 'agent',
        text: "I am actively cross-referencing your booking against our airline service policies for 23 September 2026. Your request is safely recorded in our disruption desk. Please retry or click one of the quick options below.",
        timestamp: timeNow,
        policiesUsed: ['Cancellation & Delay Service Rules']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSupervisorAction = (action: 'APPROVED' | 'REJECTED', notes: string) => {
    playResolutionSuccessSound();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
    const resolutionText = `${action === 'APPROVED' ? 'Exception Approved' : 'Exception Rejected'}: ${notes}`;

    setTicket((prev) => ({
      ...prev,
      resolutionStatus: action === 'APPROVED' ? 'RESOLVED_AUTONOMOUS' : 'RESOLVED_AUTONOMOUS',
      supervisorResolution: resolutionText
    }));

    const auditEntry: AuditLogEntry = {
      id: `audit-${Date.now()}-sup`,
      timestamp: `23 Sep 2026 ${new Date().toLocaleTimeString()}`,
      eventType: 'ACTION_EXECUTED',
      description: `Supervisor determination: ${resolutionText}`,
      policyCited: 'Supervisor Discretion Policy',
      allowed: action === 'APPROVED'
    };
    setAuditTrail((prev) => [...prev, auditEntry]);

    const systemMsg: ChatMessage = {
      id: `msg-${Date.now()}-system`,
      sender: 'system',
      text: `Supervisor determination logged: ${action} - "${notes}"`,
      timestamp: timeNow
    };
    setMessages((prev) => [...prev, systemMsg]);
  };

  const customerProfile = CUSTOMER_PROFILES[currentScenario.pnr];
  const passengerBookings = BOOKING_DATA.filter((b) => b.pnr === currentScenario.pnr);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Top Navigation */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isEscalated={ticket.resolutionStatus === 'ESCALATED_SUPERVISOR'}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'agent' && (
          <div>
            {/* Scenario Bar */}
            <ScenarioBar
              currentScenario={currentScenario}
              onSelectScenario={handleSelectScenario}
              onReset={handleResetCurrentScenario}
              activeSubMode={subMode}
              onToggleSubMode={setSubMode}
              onOpenExport={() => setIsExportOpen(true)}
              soundEnabled={soundActive}
              onToggleSound={handleToggleSound}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              {subMode === 'operations' ? (
                /* Operations Command Center & Disruption Radar */
                <OperationsBoard 
                  onSelectScenarioById={(scenId) => {
                    const found = SCENARIOS.find(s => s.id === scenId);
                    if (found) {
                      initializeScenario(found);
                      setSubMode('chat');
                    }
                  }} 
                />
              ) : (
                /* Passenger Resolution Console */
                <div className="space-y-4">
                  {/* Top Row: Passenger & Flight Card */}
                  <FlightStatusCard
                    customer={customerProfile}
                    bookings={passengerBookings}
                  />

                  {/* Resolution Workspace: Chat on Left, Inspector & Ticket Drawer on Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* Chat Column (7 cols) */}
                    <div className="lg:col-span-7">
                      <ChatInterface
                        messages={messages}
                        scenario={currentScenario}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                      />
                    </div>

                    {/* Inspection & Ticketing Column (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <TicketAndAuditDrawer
                        ticket={ticket}
                        auditTrail={auditTrail}
                        onSupervisorAction={handleSupervisorAction}
                        onOpenExport={() => setIsExportOpen(true)}
                      />

                      <PolicyInspector
                        activePolicyNames={activePolicyNames}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'inputs' && <InputsAndAssumptionsView />}
        {activeTab === 'tools' && <AIToolsView />}
      </main>

      {/* Official Export Docket Modal */}
      <ExportTicketModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        ticket={ticket}
        auditTrail={auditTrail}
      />
    </div>
  );
}

