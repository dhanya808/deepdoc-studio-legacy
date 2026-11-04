import React from 'react';
import { 
  X, 
  Cpu, 
  Sparkles, 
  Layers, 
  Table, 
  Sigma, 
  LineChart, 
  GitBranch, 
  Server, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ModelArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelArchitectureModal: React.FC<ModelArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                DeepDoc Studio: Meta AI Pipeline & System Architecture
              </h2>
              <p className="text-xs text-slate-400">
                End-to-end multimodal document deconstruction pipeline.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6 text-xs text-slate-300">
          {/* Visual Architecture Flowchart */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
            <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
              Data Pipeline & Model Routing Flow
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-[11px]">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-center">
                <span className="text-white font-bold mb-1">1. PDF Ingestion</span>
                <span className="text-[10px] text-slate-400 font-sans">Multi-page high-res rasterization via Canvas & PDF.js</span>
              </div>
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-700/60 flex flex-col justify-center">
                <span className="text-blue-300 font-bold mb-1">2. Meta SAM 3.1</span>
                <span className="text-[10px] text-blue-400 font-sans">Zero-shot segmentation of tables, charts, and formulas</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-700/60 flex flex-col justify-center">
                <span className="text-amber-300 font-bold mb-1">3. Muse Spark</span>
                <span className="text-[10px] text-amber-400 font-sans">Table $\rightarrow$ JSON/CSV & Formula $\rightarrow$ LaTeX decompiler</span>
              </div>
              <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-700/60 flex flex-col justify-center">
                <span className="text-purple-300 font-bold mb-1">4. Muse Wonder</span>
                <span className="text-[10px] text-purple-400 font-sans">Cross-modal reasoning & visual Q&A synthesis</span>
              </div>
            </div>
          </div>

          {/* Model Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SAM 3.1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>Meta SAM 3.1 (Segment Anything)</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Eliminates brittle OCR parsing. Rather than flattening documents into unstructured strings, SAM 3.1 treats document pages as visual scenes, isolating tables, figures, charts, and equations with pixel-accurate bounding coordinates and confidence scores.
              </p>
            </div>

            {/* Muse Spark */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Meta Muse Spark (Reasoning Engine)</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Powers ultra-fast structured extraction. It translates segmented table pixels into normalized JSON/CSV and ready-to-execute SQL DDL, while decompiling complex mathematical equations into clean, copyable LaTeX syntax.
              </p>
            </div>

            {/* Muse Wonder */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-purple-400 font-bold">
                <Cpu className="w-4 h-4" />
                <span>Meta Muse Wonder (Multimodal Flagship)</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Performs deep semantic cross-modal reasoning. It simultaneously reads visual charts on Page 2 and tabular numbers on Page 1, answering complex comparative queries with cited references and step-by-step reasoning chains.
              </p>
            </div>

            {/* Muse Code */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <GitBranch className="w-4 h-4" />
                <span>Meta Muse Code & Partner Endpoints</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Generates Python/Pandas transformation scripts and SQL schemas on demand. Inference is distributed across <strong>Modal</strong> (for serverless GPU SAM 3.1 execution) and <strong>Fireworks AI</strong> (for streaming generation).
              </p>
            </div>
          </div>

          {/* Hackathon Criteria Alignment Checklist */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-2.5">
            <h4 className="font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hackathon Alignment & Winning Differentiators</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Solves Real Pain:</strong> Fixes catastrophic OCR hallucination on 10-Ks & papers.</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Multi-Model Synergy:</strong> SAM 3.1 + Muse Spark + Muse Wonder.</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Partner Validation:</strong> Evaluated across Modal and Fireworks.</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Open Source:</strong> MIT licensed with reproducible local launch.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Meta Global AI Developer Hackathon 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
