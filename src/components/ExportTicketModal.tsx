import React, { useState } from 'react';
import { StructuredTicket, AuditLogEntry } from '../types';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Plane, 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { SYSTEM_DATE } from '../data/airlineData';

interface ExportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: StructuredTicket;
  auditTrail: AuditLogEntry[];
}

export const ExportTicketModal: React.FC<ExportTicketModalProps> = ({
  isOpen,
  onClose,
  ticket,
  auditTrail
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJson = () => {
    const payload = {
      system: 'AeroResolve Airline Autonomous Disruption Engine',
      generatedAt: new Date().toISOString(),
      ticket,
      auditTrail
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight">Official Resolution Docket</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  DGCA / IATA Grounded
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AeroResolve Disruption Management System • {SYSTEM_DATE}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Docket */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 printable-area">
          {/* Top Metadata Bar */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ticket Reference</span>
                <span className="font-mono text-base font-extrabold text-slate-900">{ticket.ticketId}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Disruption Event</span>
                <span className="font-semibold text-slate-800">{ticket.disruptionType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  ticket.resolutionStatus === 'RESOLVED_AUTONOMOUS' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  ticket.resolutionStatus === 'ESCALATED_SUPERVISOR' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-sky-100 text-sky-800 border border-sky-300'
                }`}>
                  {ticket.resolutionStatus.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Passenger & Flight Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Passenger</span>
                <span className="font-bold text-slate-800">{ticket.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Booking PNR</span>
                <span className="font-mono font-bold text-sky-700">{ticket.pnr}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Loyalty Tier</span>
                <span className="font-semibold text-slate-800">{ticket.loyaltyTier}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-medium">Impacted Flight</span>
                <span className="font-mono font-bold text-slate-800">{ticket.flightNumber}</span>
              </div>
            </div>
          </div>

          {/* Authorized Actions Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authorized Compensations & Recovery Provisions</span>
            </h4>
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3.5 space-y-2">
              {ticket.actionsAuthorized && ticket.actionsAuthorized.length > 0 ? (
                ticket.actionsAuthorized.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-emerald-950">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{act}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No autonomous compensation authorized.</p>
              )}

              {ticket.vouchersIssued && ticket.vouchersIssued.length > 0 && (
                <div className="pt-2 border-t border-emerald-200 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-900">Voucher & Pass Codes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ticket.vouchersIssued.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-emerald-800 font-mono text-[11px] font-bold border border-emerald-300">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {ticket.refundStatus && (
                <div className="text-xs text-emerald-900 font-medium">
                  <strong>Refund Status:</strong> {ticket.refundStatus}
                </div>
              )}
            </div>
          </div>

          {/* Escalation or Supervisor Section */}
          {(ticket.escalationReason || ticket.supervisorResolution) && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Escalation & Human Governance Record</span>
              </h4>
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 space-y-1">
                {ticket.escalationReason && (
                  <div>
                    <span className="font-bold text-amber-900">Escalation Trigger: </span>
                    <span>{ticket.escalationReason}</span>
                  </div>
                )}
                {ticket.supervisorResolution && (
                  <div className="pt-1 text-purple-900 font-semibold">
                    <span>Supervisor Ruling: {ticket.supervisorResolution}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cryptographic / Audit Traceability Stamp */}
          <div className="border-t border-slate-200 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Cryptographic Audit Entries Recorded: <strong>{auditTrail.length} events</strong></span>
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              SHA256: 7f9e4a04-19f3-48bd-aero-cert
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'JSON Copied!' : 'Copy JSON Payload'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
