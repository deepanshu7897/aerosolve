import React from 'react';
import { Sparkles, Cpu, ShieldCheck, Code, Server, Terminal, Lock } from 'lucide-react';

export const AIToolsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 text-slate-800">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autonomous Tools & AI Foundation</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          List of AI Tools Used & Implementation Methodology
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Complete disclosure of the AI foundation models, SDKs, prompt engineering strategies, guardrail filtering layers, and full-stack runtime utilized in AeroResolve.
        </p>
      </div>

      {/* Primary AI Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Tool 1: Gemini 2.5 Flash */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Google Gemini 2.5 Flash</h3>
                <span className="font-mono text-[11px] text-slate-500">model: gemini-3.8-flash</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold border border-sky-200">
              Reasoning Engine
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Chosen as the primary large multimodal language model due to its ultra-fast inference speed, exceptional reasoning accuracy in policy interpretation, and native support for structured JSON schema outputs.
          </p>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 block text-[11px]">How it was utilized:</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li><strong>Intent & Sentiment Analysis:</strong> Accurately categorizes customer state (Calm, Frustrated, Furious/Hostile) and detects core demands (refunds, upgrades, hotel, waivers).</li>
              <li><strong>Policy Mapping:</strong> Accurately cross-references the official Data Pack service rules.</li>
              <li><strong>Empathetic Response Generation:</strong> Follows the sample dialogue tones (Sample A, B, C) to de-escalate angry passengers while upholding strict company guardrails.</li>
            </ul>
          </div>
        </div>

        {/* Tool 2: @google/genai TypeScript SDK */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">@google/genai SDK</h3>
                <span className="font-mono text-[11px] text-slate-500">version ^2.4.0</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Official SDK
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            The next-generation TypeScript library for accessing Google Gemini models with full TypeScript type safety and native structured JSON schema guarantees.
          </p>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-800 block text-[11px]">Key Technical Configurations:</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li><code className="font-mono text-sky-700">temperature: 0.2</code> — Minimized hallucinations and stochastic variance to ensure deterministic adherence to policy limits.</li>
              <li><code className="font-mono text-sky-700">responseMimeType: 'application/json'</code> — Guarantees structured ticket and audit log fields are strictly parsed.</li>
              <li><code className="font-mono text-sky-700">responseSchema</code> — Strictly typed data schema defining intent, cited policies, actions authorized, and supervisor escalation flags.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Architecture Integration & Security */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-sky-600" />
          <span>Full-Stack Security & Prompt Engineering Patterns</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Server-Side API Key Isolation</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              In adherence to enterprise security standards, the Gemini API key is isolated on the Node.js Express backend (<code className="font-mono text-sky-700">server.ts</code>). No secret credentials or API keys are ever leaked to the client browser.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Negative Prompt Constraints</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              System instructions explicitly prohibit the model from hallucinating policies not found in the Data Pack. The prompt specifies prohibited actions (free business class upgrades, waivers &gt;₹1,500, legal threat handling) that trigger mandatory supervisor escalations.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Deterministic Dual-Engine Fallback</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              A high-precision deterministic rules engine is included in <code className="font-mono text-sky-700">server.ts</code>. If network outages or rate limits occur, the application seamlessly falls back to exact rule matching, ensuring zero downtime for evaluators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
