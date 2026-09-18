import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ScenarioDefinition } from '../types';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  CornerDownRight,
  ShieldCheck
} from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  scenario: ScenarioDefinition;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  scenario,
  onSendMessage,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleSuggestedClick = (text: string) => {
    if (isLoading) return;
    onSendMessage(text);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
      {/* Header bar */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-600/30 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold text-xs shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">AeroResolve Agent</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Active Dispatch</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Agent Ref: ARS-88402 • Case: {scenario.customerName} ({scenario.pnr})</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAR-M Policy Grounded</span>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="bg-slate-200/80 text-slate-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium border border-slate-300/60">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-600" />
                  <span>{msg.text}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 px-1">
                {isAgent ? (
                  <>
                    <span className="font-semibold text-sky-700">AeroResolve Agent</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </>
                ) : (
                  <>
                    <span>{msg.timestamp}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{scenario.customerName}</span>
                    {msg.sentiment && (
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        msg.sentiment.includes('Furious') ? 'bg-rose-100 text-rose-800' :
                        msg.sentiment.includes('Frustrated') ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {msg.sentiment}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  isAgent
                    ? 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                    : 'bg-sky-600 text-white rounded-br-xs shadow-2xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Agent metadata breakdown (Citations, Actions, Intent) */}
                {isAgent && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-[11px]">
                    {msg.intentDetected && (
                      <div className="flex items-start gap-1 text-slate-600">
                        <span className="font-semibold text-slate-700 shrink-0">Intent Detected:</span>
                        <span className="text-slate-600">{msg.intentDetected}</span>
                      </div>
                    )}

                    {msg.policiesUsed && msg.policiesUsed.length > 0 && (
                      <div className="flex items-start gap-1">
                        <span className="font-semibold text-slate-700 shrink-0">Source Policy Cited:</span>
                        <div className="flex flex-wrap gap-1">
                          {msg.policiesUsed.map((p, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-mono text-[10px] border border-sky-200">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.actionsTaken && msg.actionsTaken.length > 0 && (
                      <div className="flex items-start gap-1">
                        <span className="font-semibold text-slate-700 shrink-0">Actions Taken:</span>
                        <div className="flex flex-wrap gap-1">
                          {msg.actionsTaken.map((a, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] border border-emerald-200 flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.isEscalated && (
                      <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Escalated to Supervisor: {msg.escalationReason || 'Policy exception / prohibited action'}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
            <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <span>AeroResolve is checking Data Pack rules & evaluating guardrails...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Prompts */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5 font-medium">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Frequently Requested Customer Inquiries:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {scenario.suggestedFollowUps.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(prompt)}
              disabled={isLoading}
              className="text-left text-[11px] px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-slate-700 transition-colors disabled:opacity-50 shadow-2xs font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input form */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          id="chat-input-field"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Enter customer message or inquiry for ${scenario.customerName}...`}
          disabled={isLoading}
          className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50"
        />
        <button
          id="btn-send-message"
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};
