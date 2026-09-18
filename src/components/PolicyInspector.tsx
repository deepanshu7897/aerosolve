import React from 'react';
import { SERVICE_RULES } from '../data/airlineData';
import { ShieldCheck, AlertOctagon, CheckCircle2, XCircle, FileText, ChevronRight } from 'lucide-react';

interface PolicyInspectorProps {
  activePolicyNames?: string[];
}

export const PolicyInspector: React.FC<PolicyInspectorProps> = ({ activePolicyNames = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">Policy & Guardrails Inspector</h2>
            <p className="text-[11px] text-slate-500">Official Data Pack Service Rules & Enforcement Bounds</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
          5 Rules Active
        </span>
      </div>

      {/* Rules list */}
      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {SERVICE_RULES.map((rule) => {
          const isActivelyUsed = activePolicyNames.some((p) => 
            p.toLowerCase().includes(rule.category) || 
            rule.title.toLowerCase().includes(p.toLowerCase()) ||
            p.toLowerCase().includes(rule.title.toLowerCase())
          );

          return (
            <div
              key={rule.id}
              className={`p-3 rounded-lg border transition-all ${
                rule.category === 'prohibited'
                  ? isActivelyUsed
                    ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/30'
                    : 'bg-rose-50/30 border-rose-200/70'
                  : isActivelyUsed
                  ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-400/30'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-semibold ${
                  rule.category === 'prohibited' ? 'text-rose-800' : 'text-slate-800'
                }`}>
                  {rule.title}
                </span>
                {isActivelyUsed && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-600 text-white animate-pulse">
                    Active in Evaluation
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed mb-2">
                {rule.summary}
              </p>
              <div className="text-[10px] text-slate-500 bg-white/70 p-2 rounded border border-slate-200/60 font-mono whitespace-pre-line leading-normal">
                {rule.fullRule}
              </div>
            </div>
          );
        })}
      </div>

      {/* Allowed vs Prohibited Quick Legend */}
      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 p-2 rounded border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          <span>Autonomous: Free Rebooking, ₹500/Lounge, &lt;5h Hotel</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-700 font-medium bg-rose-50 p-2 rounded border border-rose-200">
          <XCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
          <span>Prohibited: Extra Comp, &gt;₹1.5k Waiver, Legal Threats</span>
        </div>
      </div>
    </div>
  );
};
