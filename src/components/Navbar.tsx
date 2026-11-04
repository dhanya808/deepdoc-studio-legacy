import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Sliders, 
  Share2, 
  Github, 
  Zap, 
  Cpu, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { DocumentItem } from '../types';

interface NavbarProps {
  documents: DocumentItem[];
  selectedDoc: DocumentItem;
  onSelectDoc: (doc: DocumentItem) => void;
  onOpenSettings: () => void;
  onOpenArchitecture: () => void;
  onOpenExecutiveSummary: () => void;
  activeModel: string;
  onChangeModel: (model: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  documents,
  selectedDoc,
  onSelectDoc,
  onOpenSettings,
  onOpenArchitecture,
  onOpenExecutiveSummary,
  activeModel,
  onChangeModel,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between z-30 sticky top-0">
      {/* Left: Brand & Hackathon Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">DeepDoc</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Studio
              </span>
              <span className="hidden md:inline-flex items-center text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                Meta Hackathon 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Multimodal PDF & Complex Document Intelligence powered by Meta
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Document Selector & Model Switcher */}
      <div className="flex items-center space-x-3">
        {/* Document Dropdown */}
        <div className="relative group">
          <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 rounded-lg px-3 py-1.5 cursor-pointer text-xs">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedDoc.id}
              onChange={(e) => {
                const doc = documents.find((d) => d.id === e.target.value);
                if (doc) onSelectDoc(doc);
              }}
              className="bg-transparent text-slate-200 outline-none cursor-pointer pr-4 font-medium"
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id} className="bg-slate-900 text-slate-200">
                  {doc.title} ({doc.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Model Pill */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-indigo-950/40 border border-indigo-800/40 rounded-lg px-2.5 py-1 text-xs">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-400">Engine:</span>
          <select
            value={activeModel}
            onChange={(e) => onChangeModel(e.target.value)}
            className="bg-transparent text-indigo-300 font-semibold outline-none cursor-pointer text-xs"
          >
            <option value="muse-wonder" className="bg-slate-900 text-white">Muse Wonder (Multimodal)</option>
            <option value="muse-spark" className="bg-slate-900 text-white">Muse Spark (Reasoning)</option>
            <option value="sam-3.1" className="bg-slate-900 text-white">SAM 3.1 (Segmenter)</option>
            <option value="llama-3.2-vision" className="bg-slate-900 text-white">Llama 3.2 Vision</option>
          </select>
        </div>
      </div>

      {/* Right: Actions, Partner Credits & Modals */}
      <div className="flex items-center space-x-2">
        {/* Executive Summary Button */}
        <button
          onClick={onOpenExecutiveSummary}
          className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md shadow-indigo-600/20 transition-all"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Executive Brief</span>
        </button>

        {/* Architecture Button */}
        <button
          onClick={onOpenArchitecture}
          className="flex items-center space-x-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
          title="View Meta Models Architecture & Pipeline"
        >
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">Architecture</span>
        </button>

        {/* Partner Settings Button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center space-x-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
          title="Inference Partners & API Credits"
        >
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">Partners & API</span>
        </button>

        {/* GitHub Link */}
        <a
          href="https://github.com/Dhanya808/deepdoc-studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
};
