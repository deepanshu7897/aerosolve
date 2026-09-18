import React from 'react';
import { ShieldCheck, Calendar, FileText, LayoutDashboard, Cpu, BookOpen, Wrench, Compass } from 'lucide-react';
import { SYSTEM_DATE } from '../data/airlineData';

interface HeaderProps {
  activeTab: 'agent' | 'architecture' | 'inputs' | 'tools';
  onTabChange: (tab: 'agent' | 'architecture' | 'inputs' | 'tools') => void;
  isEscalated?: boolean;
  onOpenExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  isEscalated,
  onOpenExport 
}) => {
  return (
    <header className="bg-slate-950 text-slate-100 border-b border-slate-800/80 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Corporate System Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-sm ring-1 ring-sky-400/30">
              <Compass className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white font-sans">
                  AeroResolve <span className="font-light text-slate-400 text-sm">| Disruption Operations</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  Enterprise Suite
                </span>
                {isEscalated && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    Supervisor Action Required
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Autonomous Passenger Resolution System • IATA / DGCA CAR Series M Compliance
              </p>
            </div>
          </div>

          {/* Operational Status & Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {onOpenExport && (
              <button
                onClick={onOpenExport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium transition-colors shadow-2xs"
                title="Generate and print official airline resolution docket"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Resolution Docket</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>{SYSTEM_DATE} • 18:45 IST</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>System Online • Guardrails Active</span>
            </div>
          </div>
        </div>

        {/* Corporate Navigation Tabs */}
        <nav className="flex items-center gap-1 mt-2.5 overflow-x-auto pb-0.5 text-xs font-medium border-t border-slate-800/80 pt-2 scrollbar-none">
          <button
            id="tab-agent"
            onClick={() => onTabChange('agent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'agent'
                ? 'bg-sky-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Disruption Console</span>
          </button>

          <button
            id="tab-architecture"
            onClick={() => onTabChange('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'architecture'
                ? 'bg-sky-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            id="tab-inputs"
            onClick={() => onTabChange('inputs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'inputs'
                ? 'bg-sky-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Regulatory Policies</span>
          </button>

          <button
            id="tab-tools"
            onClick={() => onTabChange('tools')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'tools'
                ? 'bg-sky-600 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Autonomous Tools & APIs</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
