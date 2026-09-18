import React from 'react';
import { SCENARIOS } from '../data/airlineData';
import { ScenarioDefinition } from '../types';
import { 
  RotateCcw, 
  FileText, 
  Volume2, 
  VolumeX, 
  Activity, 
  MessageSquare,
  Users
} from 'lucide-react';

interface ScenarioBarProps {
  currentScenario: ScenarioDefinition;
  onSelectScenario: (scenario: ScenarioDefinition) => void;
  onReset: () => void;
  activeSubMode?: 'chat' | 'operations';
  onToggleSubMode?: (mode: 'chat' | 'operations') => void;
  onOpenExport?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const ScenarioBar: React.FC<ScenarioBarProps> = ({
  currentScenario,
  onSelectScenario,
  onReset,
  activeSubMode = 'chat',
  onToggleSubMode,
  onOpenExport,
  soundEnabled = true,
  onToggleSound
}) => {
  return (
    <div className="bg-slate-900/95 border-b border-slate-800 px-4 sm:px-6 py-2 shadow-xs text-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Scenario Buttons & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-mode switcher */}
          {onToggleSubMode && (
            <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium mr-2">
              <button
                onClick={() => onToggleSubMode('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeSubMode === 'chat'
                    ? 'bg-sky-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Passenger Resolution Desk"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Passenger Desk</span>
              </button>
              <button
                onClick={() => onToggleSubMode('operations')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  activeSubMode === 'operations'
                    ? 'bg-sky-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Airport Disruption Radar"
              >
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                <span>Operations Radar</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mr-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Active Case:</span>
          </div>

          {SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === currentScenario.id && activeSubMode === 'chat';
            const tierBadge = 
              scenario.loyaltyTier === 'Platinum' ? 'bg-purple-950/80 text-purple-300 border-purple-700/60' :
              scenario.loyaltyTier === 'Gold' ? 'bg-amber-950/80 text-amber-300 border-amber-700/60' :
              'bg-slate-800 text-slate-300 border-slate-700';

            return (
              <button
                key={scenario.id}
                id={`btn-${scenario.id}`}
                onClick={() => {
                  onSelectScenario(scenario);
                  if (onToggleSubMode) onToggleSubMode('chat');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all text-left whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-800 border-sky-500/80 text-white ring-1 ring-sky-500/50 shadow-xs'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${tierBadge}`}>
                  {scenario.loyaltyTier}
                </span>
                <span className="font-semibold text-slate-100">{scenario.customerName}</span>
                <span className="font-mono text-slate-400 text-[11px]">[{scenario.pnr}]</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 justify-between lg:justify-end text-xs">
          {/* Export Official Ticket */}
          {onOpenExport && (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 font-medium rounded-lg transition-colors shadow-2xs whitespace-nowrap"
              title="View and print official resolution docket"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Docket</span>
            </button>
          )}

          {/* Audio toggle */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg border transition-colors ${
                soundEnabled 
                  ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700' 
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Acoustic cues active' : 'Acoustic cues muted'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            id="btn-reset-scenario"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition-colors shadow-2xs whitespace-nowrap shrink-0"
            title="Reset active customer session to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Case</span>
          </button>
        </div>
      </div>
    </div>
  );
};

