import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DocumentCanvas } from './components/DocumentCanvas';
import { SegmentInspector } from './components/SegmentInspector';
import { MultimodalChat } from './components/MultimodalChat';
import { PartnerSettingsModal } from './components/PartnerSettingsModal';
import { ModelArchitectureModal } from './components/ModelArchitectureModal';
import { ExecutiveSummaryModal } from './components/ExecutiveSummaryModal';
import { PRESET_DOCUMENTS } from './data/presetDocuments';
import { DocumentItem, DocumentSegment, PartnerConfig } from './types';
import { 
  getSavedPartnerConfig, 
  savePartnerConfig, 
  metaModelService 
} from './services/metaModelService';
import { Sparkles, MessageSquare, Sliders, Table, Sigma, Layers } from 'lucide-react';

export function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>(PRESET_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(PRESET_DOCUMENTS[0]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [selectedSegment, setSelectedSegment] = useState<DocumentSegment | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'inspector' | 'chat'>('chat');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>('muse-wonder');

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isExecutiveSummaryOpen, setIsExecutiveSummaryOpen] = useState<boolean>(false);
  const [partnerConfig, setPartnerConfig] = useState<PartnerConfig>(getSavedPartnerConfig());

  const currentPage = selectedDoc.pages[currentPageNumber - 1] || selectedDoc.pages[0];

  const handleSelectDoc = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setCurrentPageNumber(1);
    setSelectedSegment(null);
  };

  const handleSelectSegment = (segment: DocumentSegment) => {
    setSelectedSegment(segment);
    setRightPanelTab('inspector');
  };

  const handleSelectSegmentById = (segmentId: string) => {
    // Find segment across all pages
    for (const page of selectedDoc.pages) {
      const match = page.segments.find((s) => s.id === segmentId);
      if (match) {
        setCurrentPageNumber(page.pageNumber);
        setSelectedSegment(match);
        setRightPanelTab('inspector');
        return;
      }
    }
  };

  const handleRunSAM = async () => {
    setIsScanning(true);
    await metaModelService.runSAMSegmentation(currentPageNumber, currentPage.segments);
    setIsScanning(false);
  };

  const handleSavePartnerConfig = (newConfig: PartnerConfig) => {
    setPartnerConfig(newConfig);
    metaModelService.updateConfig(newConfig);
  };

  const handleAskAboutSegment = (segment: DocumentSegment) => {
    setRightPanelTab('chat');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* Top Navigation */}
      <Navbar
        documents={documents}
        selectedDoc={selectedDoc}
        onSelectDoc={handleSelectDoc}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenExecutiveSummary={() => setIsExecutiveSummaryOpen(true)}
        activeModel={activeModel}
        onChangeModel={setActiveModel}
      />

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Middle: Document Canvas */}
        <div className="flex-[6] h-full flex flex-col border-r border-slate-800 overflow-hidden relative">
          <DocumentCanvas
            currentPage={currentPage}
            totalPages={selectedDoc.totalPages}
            currentPageNumber={currentPageNumber}
            onPageChange={setCurrentPageNumber}
            selectedSegment={selectedSegment}
            onSelectSegment={handleSelectSegment}
            onRunSAM={handleRunSAM}
            isScanning={isScanning}
          />
        </div>

        {/* Right: Dual Intelligence Panel (Inspector & Multimodal Chat) */}
        <div className="flex-[4] h-full flex flex-col bg-slate-900 border-l border-slate-800 min-w-[380px] max-w-[580px] overflow-hidden">
          {/* Panel Selector Tabs */}
          <div className="h-10 border-b border-slate-800 bg-slate-950/80 px-4 flex items-center justify-between text-xs font-medium">
            <div className="flex space-x-1">
              <button
                onClick={() => setRightPanelTab('chat')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                  rightPanelTab === 'chat'
                    ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Muse Copilot</span>
              </button>

              <button
                onClick={() => setRightPanelTab('inspector')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                  rightPanelTab === 'inspector'
                    ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Segment Studio</span>
                {selectedSegment && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            </div>

            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              Meta Muse Series
            </span>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden">
            {rightPanelTab === 'chat' ? (
              <MultimodalChat
                currentDoc={selectedDoc}
                selectedSegment={selectedSegment}
                onSelectSegmentById={handleSelectSegmentById}
              />
            ) : (
              <SegmentInspector
                segment={selectedSegment}
                onClose={() => setSelectedSegment(null)}
                onAskAboutSegment={handleAskAboutSegment}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PartnerSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={partnerConfig}
        onSave={handleSavePartnerConfig}
      />

      <ModelArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <ExecutiveSummaryModal
        isOpen={isExecutiveSummaryOpen}
        onClose={() => setIsExecutiveSummaryOpen(false)}
        document={selectedDoc}
      />
    </div>
  );
}

export default App;
