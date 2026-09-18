import React from 'react';
import { CustomerProfile, BookingData } from '../types';
import { Plane, AlertTriangle, Clock, User, Mail, Phone, ShieldCheck, CheckCircle2, AlertOctagon, Info } from 'lucide-react';

interface FlightStatusCardProps {
  customer: CustomerProfile;
  bookings: BookingData[];
}

export const FlightStatusCard: React.FC<FlightStatusCardProps> = ({ customer, bookings }) => {
  const tierColor = 
    customer.loyaltyTier === 'Platinum' ? 'bg-purple-900/90 text-purple-200 border-purple-700/60' :
    customer.loyaltyTier === 'Gold' ? 'bg-amber-900/90 text-amber-200 border-amber-700/60' :
    'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mb-4">
      {/* Top Airline Electronic Ticket Manifest Bar */}
      <div className="bg-slate-900 text-slate-100 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm tracking-tight">{customer.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${tierColor}`}>
                {customer.loyaltyTier} Tier
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                FFN: SK-{customer.loyaltyTier.substring(0, 3).toUpperCase()}-9942
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-0.5">
              <span>PNR: <strong className="text-sky-400">{customer.bookingRef}</strong></span>
              <span>•</span>
              <span>E-TKT: 724-884910294</span>
              <span>•</span>
              <span>CLASS: ECONOMY STANDARD (Y)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono text-[11px] text-slate-300">{customer.email}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono text-[11px] text-slate-300">{customer.phone}</span>
          </span>
        </div>
      </div>

      {/* Flight Segments Manifest */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/40">
        {bookings.map((b, idx) => {
          const isCancelled = b.status.includes('Cancelled');
          const isDelayed = b.status.includes('Delayed');

          return (
            <div 
              key={idx}
              className={`p-3.5 rounded-lg border text-xs transition-all relative ${
                isCancelled 
                  ? 'bg-rose-50/70 border-rose-200 text-rose-950' 
                  : isDelayed 
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950' 
                  : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              }`}
            >
              {/* Status Header */}
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-sky-100 text-sky-800">
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{b.flight}</span>
                    <span className="text-slate-500 text-xs ml-1.5 font-medium">{b.route}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] tracking-wider uppercase border ${
                  isCancelled 
                    ? 'bg-rose-100 text-rose-800 border-rose-300' 
                    : isDelayed 
                    ? 'bg-amber-100 text-amber-800 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {b.status}
                </span>
              </div>

              {/* Flight Specs */}
              <div className="grid grid-cols-3 gap-2 text-slate-700 py-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Travel Date</span>
                  <span className="font-medium text-slate-800">{b.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Scheduled Dept</span>
                  <span className="font-medium text-slate-800">{b.scheduledDeparture}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Terminal / Gate</span>
                  <span className="font-medium text-slate-800">T3 • Gate 42B</span>
                </div>
              </div>

              {/* Regulatory Entitlement Notice */}
              {isCancelled && (
                <div className="mt-2.5 p-2 rounded bg-rose-100/70 border border-rose-200 text-[11px] text-rose-900 flex items-start gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Operational Notice:</strong> Cancelled due to morning airfield operational constraints at Delhi. Entitled to priority alternate rebooking on SK-206 OR full 100% refund under DGCA CAR M Section 3.
                  </span>
                </div>
              )}

              {isDelayed && (
                <div className="mt-2.5 p-2 rounded bg-amber-100/70 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Delay Advisory:</strong> Departure rescheduled due to inbound turnaround delay. Eligible for complimentary meal/refreshment voucher under Rule 3.4.
                  </span>
                </div>
              )}

              {b.isReturn && (
                <div className="mt-2.5 p-2 rounded bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Return sector is fully confirmed and unaffected by operational delays.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Customer Historical Record & Compliance Footer */}
      <div className="bg-slate-100/80 px-4 py-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold text-slate-700">Customer Travel Dossier:</span>
          <span className="text-slate-600">{customer.travelHistory}</span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          STATUS: VERIFIED ELIGIBLE FOR DISRUPTION RELIEF
        </div>
      </div>
    </div>
  );
};
