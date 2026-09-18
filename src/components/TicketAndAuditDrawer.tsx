import React, { useState } from 'react';
import { StructuredTicket, AuditLogEntry } from '../types';
import { 
  Ticket, 
  History, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  UserCheck, 
  FileCheck, 
  Send,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface TicketAndAuditDrawerProps {
  ticket: StructuredTicket;
  auditTrail: AuditLogEntry[];
  onSupervisorAction: (action: 'APPROVED' | 'REJECTED', notes: string) => void;
  onOpenExport?: () => void;
}

export const TicketAndAuditDrawer: React.FC<TicketAndAuditDrawerProps> = ({
  ticket,
  auditTrail,
  onSupervisorAction,
  onOpenExport
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ticket' | 'audit' | 'supervisor'>('ticket');
  const [supervisorNotes, setSupervisorNotes] = useState('');

  const statusBadge = 
    ticket.resolutionStatus === 'RESOLVED_AUTONOMOUS' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
    ticket.resolutionStatus === 'ESCALATED_SUPERVISOR' ? 'bg-amber-100 text-amber-800 border-amber-300' :
    'bg-sky-100 text-sky-800 border-sky-300';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-full overflow-hidden text-xs">
      {/* Sub tabs */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            id="tab-sub-ticket"
            onClick={() => setActiveSubTab('ticket')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeSubTab === 'ticket'
                ? 'bg-white text-slate-800 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-sky-600" />
            <span>Structured Ticket</span>
          </button>

          <button
            id="tab-sub-audit"
            onClick={() => setActiveSubTab('audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeSubTab === 'audit'
                ? 'bg-white text-slate-800 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <History className="w-3.5 h-3.5 text-indigo-600" />
            <span>Audit Trail ({auditTrail.length})</span>
          </button>

          <button
            id="tab-sub-supervisor"
            onClick={() => setActiveSubTab('supervisor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all relative ${
              activeSubTab === 'supervisor'
                ? 'bg-white text-slate-800 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Supervisor Desk</span>
            {ticket.resolutionStatus === 'ESCALATED_SUPERVISOR' && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute -top-0.5 -right-0.5 animate-ping" />
            )}
          </button>
        </div>

        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${statusBadge}`}>
          {ticket.resolutionStatus.replace('_', ' ')}
        </span>
      </div>

      {/* Tab Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {activeSubTab === 'ticket' && (
          <div className="space-y-3">
            {/* Ticket Header Box */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-slate-800 text-sm">{ticket.ticketId}</span>
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ticket.createdAt}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1 border-t border-slate-200/60">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-medium">Passenger</span>
                  <span className="font-semibold text-slate-800">{ticket.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-medium">PNR / Loyalty</span>
                  <span className="font-mono text-slate-700">{ticket.pnr} • {ticket.loyaltyTier}</span>
                </div>
              </div>
            </div>

            {/* Disruption & Authorized Actions */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Disruption Category
              </span>
              <div className="p-2 rounded bg-sky-50 text-sky-900 border border-sky-200 font-medium">
                {ticket.disruptionType} on Flight {ticket.flightNumber}
              </div>
            </div>

            {/* Actions Authorized */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Authorized Compensations & Actions
              </span>
              {ticket.actionsAuthorized.length > 0 ? (
                <div className="space-y-1.5">
                  {ticket.actionsAuthorized.map((act, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">No autonomous actions authorized yet.</p>
              )}
            </div>

            {/* Vouchers & Rebooking Details */}
            {ticket.vouchersIssued && ticket.vouchersIssued.length > 0 && (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Issued Passes & Vouchers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ticket.vouchersIssued.map((v, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-[11px]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Refund Status */}
            {ticket.refundStatus && (
              <div className="p-2.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                <span className="font-semibold block text-[11px]">Refund Routing:</span>
                <span>{ticket.refundStatus}</span>
              </div>
            )}

            {/* Escalation Info */}
            {ticket.escalationReason && (
              <div className="p-2.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                <div className="flex items-center gap-1.5 font-semibold text-[11px] text-amber-800 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Escalation Notice:</span>
                </div>
                <span>{ticket.escalationReason}</span>
              </div>
            )}

            {ticket.supervisorResolution && (
              <div className="p-2.5 rounded bg-purple-50 text-purple-900 border border-purple-200">
                <span className="font-semibold block text-[11px] text-purple-800">Supervisor Final Resolution:</span>
                <span>{ticket.supervisorResolution}</span>
              </div>
            )}

            {onOpenExport && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={onOpenExport}
                  className="w-full py-2 px-3 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold border border-sky-200 flex items-center justify-center gap-1.5 transition-colors text-xs"
                >
                  <FileCheck className="w-4 h-4 text-sky-600" />
                  <span>Generate & Export Official Docket</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'audit' && (
          <div className="space-y-2">
            <p className="text-slate-500 text-[11px] mb-2">
              Chronological log of AI intents, policy citations, guardrail interventions, and escalations.
            </p>

            {auditTrail.map((entry) => {
              const icon = 
                entry.eventType === 'GUARDRAIL_TRIGGERED' ? <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> :
                entry.eventType === 'ESCALATION_DISPATCHED' ? <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> :
                entry.eventType === 'ACTION_EXECUTED' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> :
                <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />;

              return (
                <div 
                  key={entry.id}
                  className={`p-2.5 rounded-lg border transition-all ${
                    entry.eventType === 'GUARDRAIL_TRIGGERED' ? 'bg-rose-50/50 border-rose-200' :
                    entry.eventType === 'ESCALATION_DISPATCHED' ? 'bg-amber-50/50 border-amber-200' :
                    entry.eventType === 'ACTION_EXECUTED' ? 'bg-emerald-50/50 border-emerald-200' :
                    'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px]">
                    <span className="font-mono font-bold text-slate-700 flex items-center gap-1">
                      {icon}
                      {entry.eventType}
                    </span>
                    <span className="text-slate-400 font-mono">{entry.timestamp}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-snug">{entry.description}</p>
                  {entry.policyCited && (
                    <div className="mt-1 text-[10px] text-slate-500 font-mono bg-white/80 px-1.5 py-0.5 rounded border border-slate-200 inline-block">
                      Cited: {entry.policyCited}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeSubTab === 'supervisor' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-sm">Human Supervisor Desk</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Autonomous agents are strictly prohibited from approving compensation beyond policy, waiving fare differences &gt;₹1,500, or handling legal threats. Review pending escalations below:
              </p>
            </div>

            {ticket.resolutionStatus === 'ESCALATED_SUPERVISOR' ? (
              <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Pending Item Under Escalation
                  </span>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-medium text-slate-800">
                    {ticket.escalationReason || 'Special compensation waiver requested'}
                  </div>
                </div>

                <div>
                  <label htmlFor="supervisor-notes-textarea" className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Supervisor Determination Notes
                  </label>
                  <textarea
                    id="supervisor-notes-textarea"
                    value={supervisorNotes}
                    onChange={(e) => setSupervisorNotes(e.target.value)}
                    placeholder="Enter policy rationale, exception approval code, or rejection justification..."
                    className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500 h-20"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    id="btn-supervisor-approve"
                    onClick={() => {
                      onSupervisorAction('APPROVED', supervisorNotes || 'Supervisor approved exception as a one-time goodwill waiver.');
                      setSupervisorNotes('');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Exception</span>
                  </button>

                  <button
                    id="btn-supervisor-reject"
                    onClick={() => {
                      onSupervisorAction('REJECTED', supervisorNotes || 'Supervisor upheld standard airline policy limits. Autonomous guardrail sustained.');
                      setSupervisorNotes('');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject / Uphold Rule</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 opacity-80" />
                <p className="font-medium text-slate-700">No Pending Escalations</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  The current customer conversation is operating within autonomous agent bounds, or has already been resolved.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
