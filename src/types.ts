export type LoyaltyTier = 'Silver' | 'Gold' | 'Platinum';

export type FlightDisruptionStatus = 
  | 'Cancelled (operational reasons)'
  | 'Delayed 4h (new departure 11:10)'
  | 'Delayed 6h (new departure 20:00)'
  | 'Unaffected';

export interface CustomerProfile {
  id: string;
  name: string;
  loyaltyTier: LoyaltyTier;
  bookingRef: string;
  email: string;
  phone: string;
  travelHistory: string;
  scenarioId: 'scenario-1' | 'scenario-2' | 'scenario-3';
}

export interface BookingData {
  customer: string;
  pnr: string;
  flight: string;
  route: string;
  date: string;
  scheduledDeparture: string;
  status: FlightDisruptionStatus;
  isReturn?: boolean;
}

export interface ServiceRule {
  id: string;
  title: string;
  category: 'cancellation' | 'delay' | 'refund' | 'fare_difference' | 'loyalty' | 'prohibited';
  summary: string;
  fullRule: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: 'INTENT_DETECTED' | 'POLICY_EVALUATED' | 'ACTION_EXECUTED' | 'GUARDRAIL_TRIGGERED' | 'ESCALATION_DISPATCHED';
  description: string;
  policyCited?: string;
  allowed: boolean;
  notes?: string;
}

export interface StructuredTicket {
  ticketId: string;
  createdAt: string;
  customerName: string;
  pnr: string;
  loyaltyTier: LoyaltyTier;
  flightNumber: string;
  disruptionType: 'CANCELLATION' | 'DELAY_4H' | 'DELAY_6H';
  resolutionStatus: 'OPEN' | 'RESOLVED_AUTONOMOUS' | 'ESCALATED_SUPERVISOR';
  actionsAuthorized: string[];
  rebookingDetails?: string;
  vouchersIssued?: string[];
  refundStatus?: string;
  escalationReason?: string;
  supervisorResolution?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  intentDetected?: string;
  sentiment?: 'Calm' | 'Frustrated' | 'Furious / Hostile';
  policiesUsed?: string[];
  actionsTaken?: string[];
  isEscalated?: boolean;
  escalationReason?: string;
}

export interface ScenarioDefinition {
  id: 'scenario-1' | 'scenario-2' | 'scenario-3';
  title: string;
  customerName: string;
  loyaltyTier: LoyaltyTier;
  pnr: string;
  brief: string;
  initialCustomerMessage: string;
  expectedBehavior: string[];
  suggestedFollowUps: string[];
}
