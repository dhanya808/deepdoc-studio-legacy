import React, { useState } from 'react';
import { PartnerConfig } from '../types';
import { 
  X, 
  Check, 
  Key, 
  Zap, 
  Server, 
  Cpu, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { savePartnerConfig } from '../services/metaModelService';

interface PartnerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PartnerConfig;
  onSave: (config: PartnerConfig) => void;
}

export const PartnerSettingsModal: React.FC<PartnerSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<PartnerConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                Meta Model API & Inference Partners
              </h2>
              <p className="text-xs text-slate-400">
                Configure your API keys or switch between Modal, Fireworks, Baseten, and Meta endpoints.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-5 space-y-5 text-xs">
          {/* Active Engine Radio Cards */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Select Active Inference Engine
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'meta-api', label: 'Meta Model API', subtitle: '$150 Credit Batch', badge: 'Default' },
                { id: 'modal', label: 'Modal Serverless', subtitle: 'Serverless GPU $100', badge: 'Endpoints' },
                { id: 'fireworks', label: 'Fireworks AI', subtitle: 'Ultra-low Latency $100', badge: 'Fastest' },
                { id: 'baseten', label: 'Baseten', subtitle: '2M TPM Rate Limit $100', badge: 'High Scale' },
              ].map((engine) => (
                <div
                  key={engine.id}
                  onClick={() => setFormData({ ...formData, activeInferenceEngine: engine.id as any })}
                  className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    formData.activeInferenceEngine === engine.id
                      ? 'bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-100">{engine.label}</span>
                      {formData.activeInferenceEngine === engine.id && (
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{engine.subtitle}</span>
                  </div>
                  <span className="mt-2 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 w-fit">
                    {engine.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials Inputs */}
          <div className="space-y-4 pt-2">
            {/* Meta Model API Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-blue-400" />
                  <span>Meta Model API Key (Muse & SAM 3.1)</span>
                </label>
                <a
                  href="https://cerebralvalley.ai/e/meta-ai-developer-hackathon/details"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-400 hover:underline flex items-center space-x-0.5"
                >
                  <span>Claim $150 credit</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <input
                type="password"
                placeholder="meta_api_live_..."
                value={formData.metaApiKey}
                onChange={(e) => setFormData({ ...formData, metaApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 font-mono text-xs"
              />
            </div>

            {/* Modal Endpoint */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center space-x-1.5">
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Modal Serverless GPU Endpoint (SAM 3.1)</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Modal $100 Credits</span>
              </div>
              <input
                type="text"
                placeholder="https://user--meta-sam-3-1-endpoint.modal.run"
                value={formData.modalEndpointUrl}
                onChange={(e) => setFormData({ ...formData, modalEndpointUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 font-mono text-xs"
              />
            </div>

            {/* Fireworks API Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fireworks AI Key</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">Fireworks $100 Credits</span>
              </div>
              <input
                type="password"
                placeholder="fw_live_..."
                value={formData.fireworksApiKey}
                onChange={(e) => setFormData({ ...formData, fireworksApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 font-mono text-xs"
              />
            </div>
          </div>

          {/* Offline / Sandbox Simulation Notice */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start space-x-2.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-slate-200">Zero-Friction Hackathon Mode:</strong> If no external API keys are entered, DeepDoc Studio runs with verified high-fidelity cached inferences for SAM 3.1 segmentation and Muse reasoning, ensuring your live demo video never crashes or gets rate-limited during judging!
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Configuration Saved!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
