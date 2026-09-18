import React from 'react';
import { SlidersHorizontal, Database, CheckSquare, Info, ShieldAlert, FileText, Calendar } from 'lucide-react';
import { SYSTEM_DATE, CUSTOMER_PROFILES, BOOKING_DATA, SERVICE_RULES } from '../data/airlineData';

export const InputsAndAssumptionsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 text-slate-800">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Operational Grounding & Policies</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Inputs, Sources & Documented Assumptions
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Detailed catalog of the official grounding inputs provided in the Assignment 3 Data Pack, policy boundaries, and production engineering assumptions.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Input 1: Temporal & Master Date */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <Calendar className="w-4 h-4" />
            <span>Temporal Anchor</span>
          </div>
          <div className="p-2.5 rounded bg-sky-50 text-sky-900 font-mono font-semibold">
            {SYSTEM_DATE}
          </div>
          <p className="text-slate-600 leading-relaxed">
            All flight operations, cancellations, delays, voucher issuances, and 7-business-day refund calculations are strictly relative to this fixed system timestamp.
          </p>
        </div>

        {/* Input 2: Customer Grounding Data */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Database className="w-4 h-4" />
            <span>Customer Profiles (3)</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Fully ground truth customer records containing:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-600">
            <li><strong>Priya Nair:</strong> Gold Tier, PNR SK4821X, 6 flights, 1 prior baggage complaint resolved with voucher.</li>
            <li><strong>Arvind Kulkarni:</strong> Silver Tier, PNR TR1190B, 3 flights, 0 prior complaints.</li>
            <li><strong>Meher Kaur:</strong> Platinum Tier, PNR WL7742, 10 flights, 1 prior overbooking complaint resolved with tier upgrade.</li>
          </ul>
        </div>

        {/* Input 3: Disruption Flight Matrix */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <FileText className="w-4 h-4" />
            <span>Live Flight Disruption Ledger</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-600">
            <li><strong>SK-204 (DEL → GOI):</strong> Cancelled (Operational reasons).</li>
            <li><strong>Return Leg (GOI → DEL):</strong> Unaffected (Fri 25 Sep).</li>
            <li><strong>SK-118 (BOM → BLR):</strong> Delayed 4h (new dep 11:10).</li>
            <li><strong>SK-305 (DEL → HYD):</strong> Delayed 6h (new dep 20:00).</li>
          </ul>
        </div>
      </div>

      {/* Service Policy Boundaries Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-sky-600" />
          <span>Core Service Rules from Official Data Pack</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Rule Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Policy Summary</th>
                <th className="py-2.5 px-3">Autonomous Agent Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SERVICE_RULES.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{rule.title}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-sky-700">{rule.category}</td>
                  <td className="py-2.5 px-3 text-slate-600">{rule.summary}</td>
                  <td className="py-2.5 px-3">
                    {rule.category === 'prohibited' ? (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px]">
                        STRICTLY PROHIBITED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        PERMITTED WITHIN LIMITS
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assumptions Documented */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Documented Business & Technical Assumptions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-800 text-xs">1. Disruption Causality & Coverage</span>
            <p className="text-slate-600 leading-relaxed">
              All three scenarios in the Data Pack stem from <em>operational airline causes</em> (crew, maintenance, aircraft rotation). Under Indian DGCA civil aviation requirements and company policy, this guarantees full airline-paid compensation rights without passenger fault deductions.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-800 text-xs">2. Return Leg Independence</span>
            <p className="text-slate-600 leading-relaxed">
              In Scenario 1, Priya’s outbound flight SK-204 is cancelled, but her return leg (Goa to Delhi on Fri 25 Sep) is unaffected. It is assumed the return flight remains valid. Upgrades to business class on the return leg cannot be granted autonomously as compensation for outbound disruptions.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-800 text-xs">3. Hotel Coverage Duration Scope</span>
            <p className="text-slate-600 leading-relaxed">
              In Scenario 3 (Meher Kaur), the delay is 6 hours (14:00 to 20:00). Policy specifies hotel accommodation covers <em>only the delayed hours</em> (day-use transit hotel) rather than a full overnight 24-hour stay, since departure takes place the same evening.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-800 text-xs">4. Agent Autonomy Ceiling (₹1,500 Fare Cap)</span>
            <p className="text-slate-600 leading-relaxed">
              Customer-facing agents have an autonomous ceiling of ₹1,500 for voluntary fare difference waivers. Any amount exceeding this (such as Meher’s ₹2,000 difference) must be escalated to a human supervisor or paid by the passenger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
