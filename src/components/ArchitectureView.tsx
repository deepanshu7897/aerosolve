import React from 'react';
import { Layers, ArrowRight, ShieldCheck, Cpu, Database, UserCheck, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 text-slate-800">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>System Architecture</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Architecture & Agentic Process Flow
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Complete architectural topology and end-to-end decision workflow designed for deterministic policy adherence, safety guardrails, structured ticketing, and auditable human escalations.
        </p>
      </div>

      {/* Visual System Architecture Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-sky-600" />
          <span>System Topology Diagram</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs">
          {/* Box 1: Customer Client */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-2">
            <span className="font-bold text-slate-800 block">Customer Interface</span>
            <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-100">
              React 19 + Tailwind
              <br />Real-time chat UI
              <br />Edge-case prompts
            </div>
            <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 text-[10px] font-mono block">
              POST /api/chat
            </span>
          </div>

          <div className="hidden md:flex justify-center text-slate-400">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Box 2: Express Server Proxy */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-center space-y-2">
            <span className="font-bold text-sky-900 block">Secure Express Proxy</span>
            <div className="text-[11px] text-sky-800 bg-white p-2 rounded border border-sky-100">
              Node.js + tsx
              <br />Key Isolation (Port 3000)
              <br />Data Pack Context Injection
            </div>
            <span className="px-1.5 py-0.5 rounded bg-sky-200/70 text-sky-800 text-[10px] font-mono block">
              Server-Side SDK
            </span>
          </div>

          <div className="hidden md:flex justify-center text-slate-400">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Box 3: Gemini Reasoning + Policy Guardrails */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center space-y-2">
            <span className="font-bold text-indigo-900 block">Gemini 2.5 Flash + Rules</span>
            <div className="text-[11px] text-indigo-800 bg-white p-2 rounded border border-indigo-100">
              @google/genai SDK
              <br />JSON Schema Enforcement
              <br />Allowed/Prohibited Check
            </div>
            <span className="px-1.5 py-0.5 rounded bg-indigo-200/70 text-indigo-800 text-[10px] font-mono block">
              Strict Temp 0.2
            </span>
          </div>
        </div>

        {/* Downstream Operations Layer */}
        <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Autonomous Execution</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Rebooks within 24h, issues meal vouchers (&lt;3h/&gt;3h/&gt;5h), lounge passes, and delayed-hours transit hotel rooms directly.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Supervisor Escalation</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Traps waivers &gt;₹1,500, unapproved upgrades (Priya), legal threats, and out-of-policy requests for human desk review.
            </p>
          </div>

          <div className="bg-slate-100 border border-slate-300 p-3 rounded-lg">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <FileCheck className="w-4 h-4 text-slate-600" />
              <span>Ticket & Audit Ledger</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Maintains chronological state, logs timestamps, policy IDs, and customer sentiments for auditability.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Decision Flow */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Six-Stage Agentic Process Flow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">1</span>
              <h4 className="font-bold text-slate-800 text-sm">Message Ingestion & Sentiment Classification</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a passenger transmits a prompt, the agent classifies sentiment (<code className="text-rose-600 font-mono">Furious / Hostile</code>, <code className="text-amber-600 font-mono">Frustrated</code>, <code className="text-slate-600 font-mono">Calm</code>) and pinpoints customer intent (e.g. refund demand, hotel inquiry, fare difference waiver, legal action threat).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">2</span>
              <h4 className="font-bold text-slate-800 text-sm">Data Pack Grounding & Profile Lookup</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The agent references PNR data (e.g. SK4821X), loyalty tier (Gold/Silver/Platinum), disruption reason (operational vs non-airline), and past complaint history (e.g. Priya’s prior baggage voucher) from the Wednesday, 23 Sep 2026 ground truth dataset.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">3</span>
              <h4 className="font-bold text-slate-800 text-sm">Policy Engine Evaluation</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates the 5 Service Rules:
              1. Cancellation Rebooking (24h free rebook vs 7-day refund)
              2. Delay Compensation (&lt;3h ₹500, &gt;3h lounge, &gt;5h hotel for delayed hours)
              3. Refund Processing (original payment method only)
              4. Fare Difference (&gt;₹1,500 requires supervisor)
              5. Loyalty Tier (priority seats only, no extra comp).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">4</span>
              <h4 className="font-bold text-slate-800 text-sm">Guardrail Verification (Allowed vs. Prohibited)</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hard filter verifies that the requested action is NOT in the prohibited list:
              • No unapproved upgrades to business class
              • No fare difference waivers above ₹1,500
              • No refunds to non-original payment methods
              • Immediate escalation upon legal threats or formal complaints.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">5</span>
              <h4 className="font-bold text-slate-800 text-sm">Action Execution vs. Supervisor Routing</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If allowed, executes autonomous action (e.g. issues voucher, triggers full refund request). If prohibited, politely denies with policy citations or routes to the interactive Supervisor Desk for human review.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">6</span>
              <h4 className="font-bold text-slate-800 text-sm">Ticket Generation & Audit Logging</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Outputs a persistent JSON structured ticket (<code className="text-sky-700 font-mono">TKT-XXXX</code>) and logs an immutable audit trail entry recording timestamp, policy cited, agent reasoning, and customer interaction history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
