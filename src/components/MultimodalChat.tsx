import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  DocumentItem, 
  DocumentSegment 
} from '../types';
import { 
  Send, 
  Sparkles, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  FileCheck,
  CheckCircle2,
  HelpCircle,
  CornerDownRight,
  Bot
} from 'lucide-react';
import { metaModelService } from '../services/metaModelService';

interface MultimodalChatProps {
  currentDoc: DocumentItem;
  selectedSegment: DocumentSegment | null;
  onSelectSegmentById: (segmentId: string) => void;
}

export const MultimodalChat: React.FC<MultimodalChatProps> = ({
  currentDoc,
  selectedSegment,
  onSelectSegmentById,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedThinking, setExpandedThinking] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial welcome message whenever currentDoc changes
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-' + currentDoc.id,
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: `I've mapped **${currentDoc.title}** using **SAM 3.1 visual segmentation**.
      
I can synthesize tables, translate mathematical formulas into LaTeX, and perform cross-modal reasoning across charts and text simultaneously.

Try asking one of the suggested prompts below, or click any highlighted region on the page to analyze it.`,
      modelUsed: 'Muse Wonder (Multimodal)',
      executionTimeMs: 120,
      thinkingSteps: [
        'SAM 3.1 segmentation cache primed for 2 pages.',
        'Extracted layout coordinates and OCR embeddings.',
        'Ready for multimodal cross-reference queries.'
      ],
      referencedSegmentIds: currentDoc.pages[0]?.segments.slice(0, 2).map((s) => s.id) || []
    };
    setMessages([welcomeMsg]);
  }, [currentDoc.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await metaModelService.askMultimodalQuestion(
        textToSend,
        currentDoc,
        selectedSegment || undefined
      );
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: 'Error communicating with Meta inference pipeline. Please check API settings.',
        modelUsed: 'Muse Wonder (Multimodal)',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleThinking = (msgId: string) => {
    setExpandedThinking((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  // Pre-seeded prompt chips based on active document
  const samplePrompts = currentDoc.id === 'meta-financial-10k'
    ? [
        'Calculate YoY revenue growth and margin impact',
        'Analyze AI CapEx trajectory and power guidance',
        'Compare Q3 2025 vs Q4 2026 R&D expenses'
      ]
    : currentDoc.id === 'quantum-transformer-paper'
    ? [
        'Explain Equation (1) Unitary Attention Kernel',
        'How does QUA scale memory at 512k vs FlashAttention-3?',
        'Summarize the key mathematical proof'
      ]
    : [
        'Compare Cohort C vs Cohort D efficacy and toxicity',
        'Explain Equation (3) Hill model parameters',
        'What is the recommended dose threshold?'
      ];

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 text-slate-200 overflow-hidden">
      {/* Chat Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wide">
              Meta Muse Multimodal Copilot
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Cross-Modal Reasoning Active</span>
            </span>
          </div>
        </div>

        {selectedSegment && (
          <div className="text-[10px] bg-slate-800 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-full truncate max-w-[150px]">
            Focused: {selectedSegment.label}
          </div>
        )}
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label & Meta Info */}
            <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-slate-500 font-mono">
              <span>{msg.sender === 'user' ? 'You' : 'Meta Muse Wonder'}</span>
              <span>·</span>
              <span>{msg.timestamp}</span>
              {msg.executionTimeMs && (
                <>
                  <span>·</span>
                  <span className="text-cyan-400 flex items-center space-x-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{msg.executionTimeMs}ms</span>
                  </span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[90%] rounded-xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              {/* Thinking Steps Collapsible Accordion */}
              {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                <div className="mb-2.5 pb-2 border-b border-slate-800">
                  <button
                    onClick={() => toggleThinking(msg.id)}
                    className="flex items-center space-x-1 text-[10px] font-mono text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>
                      {expandedThinking[msg.id] ? 'Hide Muse Reasoning Chain' : 'View Muse Reasoning Chain'}
                    </span>
                    {expandedThinking[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  {expandedThinking[msg.id] && (
                    <div className="mt-2 pl-3 border-l-2 border-indigo-500/40 space-y-1 text-[11px] text-slate-400 font-mono bg-slate-900/60 p-2 rounded">
                      {msg.thinkingSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Message Content */}
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Document Citation Badges */}
              {msg.referencedSegmentIds && msg.referencedSegmentIds.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                    Citations:
                  </span>
                  {msg.referencedSegmentIds.map((segId) => (
                    <button
                      key={segId}
                      onClick={() => onSelectSegmentById(segId)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded flex items-center space-x-1 transition"
                    >
                      <CornerDownRight className="w-2.5 h-2.5 text-indigo-400" />
                      <span>{segId.replace('seg-', '')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-mono p-3 bg-slate-950/80 rounded-xl border border-slate-800 w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Muse Wonder is synthesizing multimodal context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions */}
      <div className="p-2 border-t border-slate-800/80 bg-slate-950/50 flex flex-wrap gap-1.5">
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="text-[11px] bg-slate-800/80 hover:bg-indigo-900/40 text-slate-300 hover:text-indigo-200 border border-slate-700/80 hover:border-indigo-600/50 px-2.5 py-1 rounded-full transition truncate max-w-full"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 focus-within:border-indigo-500 transition shadow-inner"
        >
          <input
            type="text"
            placeholder="Ask about tables, formulas, or cross-modal insights..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition shadow shadow-indigo-600/30"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
