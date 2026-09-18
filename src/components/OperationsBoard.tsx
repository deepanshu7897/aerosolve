import React from 'react';
import { 
  Plane, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { SYSTEM_DATE } from '../data/airlineData';
import { ScenarioDefinition } from '../types';

interface OperationsBoardProps {
  onSelectScenarioById: (scenarioId: 'scenario-1' | 'scenario-2' | 'scenario-3') => void;
}

export const OperationsBoard: React.FC<OperationsBoardProps> = ({ onSelectScenarioById }) => {
  const operationsFlights = [
    {
      flightNo: 'SK-204',
      origin: 'DEL (Delhi)',
      dest: 'GOI (Goa)',
      scheduled: '06:00 IST',
      status: 'CANCELLED',
      reason: 'Operational Reason (Aircraft Maintenance)',
      passengersAffected: 142,
      tierPax: 'Priya Nair (Gold)',
      scenarioId: 'scenario-1' as const,
      statusClass: 'bg-rose-100 text-rose-800 border-rose-300'
    },
    {
      flightNo: 'SK-118',
      origin: 'BOM (Mumbai)',
      dest: 'BLR (Bengaluru)',
      scheduled: '07:10 IST',
      status: 'DELAYED 4H',
      reason: 'Air Traffic Control Congestion → New Departure 11:10 IST',
      passengersAffected: 168,
      tierPax: 'Arvind Kulkarni (Silver)',
      scenarioId: 'scenario-2' as const,
      statusClass: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      flightNo: 'SK-305',
      origin: 'DEL (Delhi)',
      dest: 'HYD (Hyderabad)',
      scheduled: '14:00 IST',
      status: 'DELAYED 6H',
      reason: 'Inbound Aircraft Rotational Delay → New Departure 20:00 IST',
      passengersAffected: 180,
      tierPax: 'Meher Kaur (Platinum)',
      scenarioId: 'scenario-3' as const,
      statusClass: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    {
      flightNo: 'SK-206',
      origin: 'DEL (Delhi)',
      dest: 'GOI (Goa)',
      scheduled: '08:30 IST (Thu 24 Sep)',
      status: 'RECOVERY FLIGHT',
      reason: 'Designated next-day recovery flight with open inventory',
      passengersAffected: 0,
      tierPax: 'Open for Priority Rebooking',
      scenarioId: 'scenario-1' as const,
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Operations Telemetry Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Disrupted Passengers</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">490</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Across 3 active morning sectors</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Autonomous Resolution</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">91.4%</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Mean Time: 840ms vs 14m call wait</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Policy Guardrails</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-600 tracking-tight">100%</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Zero unapproved financial leakage</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Supervisor Escalations</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">1 Active</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Pending ₹2,000 waiver approval</p>
        </div>
      </div>

      {/* Disruption Flight Radar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            <span className="font-bold text-sm text-slate-900">Network Disruption Board • {SYSTEM_DATE}</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Directly synced to airline reservation & dispatch system
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {operationsFlights.map((flight, idx) => (
            <div 
              key={idx} 
              className="p-4 sm:px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold shrink-0 border border-sky-200">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{flight.flightNo}</span>
                    <span className="text-xs font-semibold text-slate-700">{flight.origin} → {flight.dest}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${flight.statusClass}`}>
                      {flight.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{flight.reason}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>Scheduled: {flight.scheduled}</span>
                    <span>•</span>
                    <span>Affected Pax: {flight.passengersAffected}</span>
                    <span>•</span>
                    <span className="text-sky-700 font-medium">{flight.tierPax}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectScenarioById(flight.scenarioId)}
                className="self-start md:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white transition-colors shadow-2xs shrink-0"
              >
                <span>Launch Passenger Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
