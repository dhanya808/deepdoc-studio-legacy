import React, { useState } from 'react';
import { 
  DocumentPage, 
  DocumentSegment, 
  SegmentType 
} from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Eye, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Table,
  LineChart,
  Sigma,
  AlignLeft,
  ScanLine
} from 'lucide-react';

interface DocumentCanvasProps {
  currentPage: DocumentPage;
  totalPages: number;
  currentPageNumber: number;
  onPageChange: (newPage: number) => void;
  selectedSegment: DocumentSegment | null;
  onSelectSegment: (segment: DocumentSegment) => void;
  onRunSAM: () => void;
  isScanning: boolean;
}

const getSegmentColor = (type: SegmentType) => {
  switch (type) {
    case 'table':
      return {
        border: 'border-emerald-500/80 hover:border-emerald-400',
        bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
        badge: 'bg-emerald-500/90 text-white',
        ring: 'ring-emerald-400',
        icon: Table,
        label: 'Table',
      };
    case 'chart':
      return {
        border: 'border-purple-500/80 hover:border-purple-400',
        bg: 'bg-purple-500/10 hover:bg-purple-500/20',
        badge: 'bg-purple-500/90 text-white',
        ring: 'ring-purple-400',
        icon: LineChart,
        label: 'Chart/Figure',
      };
    case 'formula':
      return {
        border: 'border-amber-500/80 hover:border-amber-400',
        bg: 'bg-amber-500/10 hover:bg-amber-500/20',
        badge: 'bg-amber-500/90 text-white',
        ring: 'ring-amber-400',
        icon: Sigma,
        label: 'Formula',
      };
    case 'heading':
    case 'text':
    default:
      return {
        border: 'border-cyan-500/60 hover:border-cyan-400',
        bg: 'bg-cyan-500/5 hover:bg-cyan-500/15',
        badge: 'bg-cyan-600/90 text-white',
        ring: 'ring-cyan-400',
        icon: AlignLeft,
        label: 'Text',
      };
  }
};

export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  currentPage,
  totalPages,
  currentPageNumber,
  onPageChange,
  selectedSegment,
  onSelectSegment,
  onRunSAM,
  isScanning,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [hoveredSegment, setHoveredSegment] = useState<DocumentSegment | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 15, 175));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative">
      {/* Canvas Toolbar */}
      <div className="h-12 border-b border-slate-800 bg-slate-900/60 px-4 flex items-center justify-between text-xs text-slate-300 z-10">
        {/* Left: Page Navigator */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPageNumber - 1)}
            disabled={currentPageNumber <= 1}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-medium text-slate-200">
            Page <span className="text-white font-bold">{currentPageNumber}</span> of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPageNumber + 1)}
            disabled={currentPageNumber >= totalPages}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 truncate max-w-[200px] xl:max-w-[320px]">
            {currentPage.title}
          </span>
        </div>

        {/* Right: SAM Controls & Zoom */}
        <div className="flex items-center space-x-2">
          {/* SAM Re-Scan Trigger */}
          <button
            onClick={onRunSAM}
            disabled={isScanning}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition shadow-sm ${
              isScanning
                ? 'bg-blue-600/40 text-blue-200 cursor-wait'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
            }`}
            title="Execute Meta SAM 3.1 zero-shot segmentation pass"
          >
            <ScanLine className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'SAM 3.1 Segmenting...' : 'Run SAM 3.1'}</span>
          </button>

          {/* Toggle Masks */}
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`flex items-center space-x-1 px-2 py-1 rounded border text-xs transition ${
              showOverlays
                ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle visual segmentation bounding masks"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Masks ({currentPage.segments.length})</span>
          </button>

          <span className="text-slate-700">|</span>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-slate-800/80 rounded-md p-0.5 border border-slate-700/60">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-700 rounded text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono text-slate-300 w-9 text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-700 rounded text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Viewport (Scrollable container) */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-start justify-center bg-slate-950">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 ease-out relative shadow-2xl rounded-lg bg-slate-900 border border-slate-800 w-[780px] min-h-[1020px] select-none text-slate-200 p-8 flex flex-col justify-between"
        >
          {/* Scanning Radar Laser Line Animation */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce z-40 pointer-events-none" />
          )}

          {/* Realistic High-Fidelity Document Content Render */}
          <div className="space-y-6">
            {/* Document Header Rendering */}
            <div className="border-b border-slate-700/80 pb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest font-mono">
                <span>UNITED STATES SEC — FORM 10-K</span>
                <span>CONFIDENTIAL & PROPRIETARY</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight mt-2 font-serif">
                {currentPage.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-serif italic">
                Reporting Period: Fiscal Year 2026 Consolidated Results
              </p>
            </div>

            {/* Document Narrative / Body Mockup */}
            <div className="text-xs text-slate-300 leading-relaxed font-serif space-y-3">
              <p>
                The accelerating deployment of supercomputing infrastructure in fiscal 2026 represents a foundational inflection point in operational efficiency. Through the integration of the Meta Muse model architecture, automated code synthesis, and multi-gigatoken context windowing, computing efficiency increased while total operating expenses maintained strict alignment with long-term margin targets.
              </p>
            </div>

            {/* Rendered Table Preview */}
            {currentPage.segments.some((s) => s.type === 'table') && (
              <div className="my-4 border border-slate-700 rounded-md overflow-hidden bg-slate-950/60 font-sans text-xs">
                {currentPage.segments
                  .filter((s) => s.type === 'table')
                  .map((tblSeg) => (
                    <div key={tblSeg.id} className="p-3">
                      <div className="text-[11px] font-semibold text-slate-300 mb-2 uppercase tracking-wider flex items-center justify-between">
                        <span>{tblSeg.label}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">SAM 3.1 Extracted</span>
                      </div>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-700 bg-slate-900/80 text-slate-300">
                            {tblSeg.tableData?.headers.slice(0, 5).map((h, i) => (
                              <th key={i} className="p-1.5 font-medium">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {tblSeg.tableData?.rows.slice(0, 5).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/40">
                              {row.slice(0, 5).map((cell, cIdx) => (
                                <td key={cIdx} className={`p-1.5 font-mono ${cIdx > 0 ? 'text-right' : 'font-medium text-slate-200'}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
            )}

            {/* Rendered Formula Preview */}
            {currentPage.segments.some((s) => s.type === 'formula') && (
              <div className="my-4 p-4 border border-slate-700/80 rounded-md bg-slate-950/80 font-mono text-center">
                {currentPage.segments
                  .filter((s) => s.type === 'formula')
                  .map((fSeg) => (
                    <div key={fSeg.id} className="space-y-1">
                      <div className="text-[10px] uppercase text-amber-400 tracking-wider font-semibold">
                        {fSeg.label}
                      </div>
                      <div className="text-sm font-bold text-amber-200 py-2 overflow-x-auto">
                        {fSeg.formulaData?.latex || 'LaTeX Formula'}
                      </div>
                      <div className="text-[11px] text-slate-400 italic">
                        {fSeg.formulaData?.description}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Rendered Chart Preview */}
            {currentPage.segments.some((s) => s.type === 'chart') && (
              <div className="my-4 p-4 border border-slate-700/80 rounded-md bg-slate-950/80">
                {currentPage.segments
                  .filter((s) => s.type === 'chart')
                  .map((cSeg) => (
                    <div key={cSeg.id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-purple-300">{cSeg.chartData?.title}</span>
                        <span className="text-[10px] text-purple-400 font-mono">Visual Region</span>
                      </div>
                      {/* Visual mini bar chart bars */}
                      <div className="flex items-end space-x-3 h-28 pt-4 px-2 border-b border-l border-slate-700">
                        {cSeg.chartData?.dataPoints.map((dp, idx) => {
                          const maxVal = Math.max(...cSeg.chartData!.dataPoints.map((d) => d.value));
                          const heightPct = Math.round((dp.value / maxVal) * 100);
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center group relative">
                              <span className="text-[9px] font-mono text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition">
                                {dp.value}
                              </span>
                              <div
                                style={{ height: `${heightPct}%` }}
                                className="w-full bg-gradient-to-t from-purple-700 to-indigo-500 rounded-t group-hover:from-purple-500 group-hover:to-indigo-300 transition-all"
                              />
                              <span className="text-[9px] text-slate-400 mt-1 truncate max-w-full">
                                {dp.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Footer of the document page */}
          <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>SEC DOCUMENT ID: 0001326801-26-000042</span>
            <span>PAGE {currentPageNumber}</span>
          </div>

          {/* ================================================================= */}
          {/* SAM 3.1 Bounding Overlays Layer (Interactive BBoxes) */}
          {/* ================================================================= */}
          {showOverlays && (
            <div className="absolute inset-0 pointer-events-auto">
              {currentPage.segments.map((segment) => {
                const styleConfig = getSegmentColor(segment.type);
                const isSelected = selectedSegment?.id === segment.id;
                const isHovered = hoveredSegment?.id === segment.id;
                const Icon = styleConfig.icon;

                return (
                  <div
                    key={segment.id}
                    onClick={() => onSelectSegment(segment)}
                    onMouseEnter={() => setHoveredSegment(segment)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      left: `${segment.bbox.x}%`,
                      top: `${segment.bbox.y}%`,
                      width: `${segment.bbox.width}%`,
                      height: `${segment.bbox.height}%`,
                    }}
                    className={`absolute rounded cursor-pointer transition-all duration-150 border-2 ${
                      isSelected
                        ? `${styleConfig.border} bg-white/10 ring-4 ${styleConfig.ring} shadow-xl z-30`
                        : `${styleConfig.border} ${styleConfig.bg} z-20`
                    }`}
                  >
                    {/* Floating Segment Badge */}
                    <div
                      className={`absolute -top-3.5 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 shadow-md ${styleConfig.badge}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{segment.label}</span>
                      <span className="font-mono text-[9px] opacity-80">
                        ({Math.round(segment.confidence * 100)}%)
                      </span>
                    </div>

                    {/* Hover HUD Tooltip */}
                    {isHovered && !isSelected && (
                      <div className="absolute -bottom-8 left-2 bg-slate-950/95 border border-slate-700 px-2 py-1 rounded text-[11px] text-slate-200 shadow-2xl flex items-center space-x-2 z-40 pointer-events-none whitespace-nowrap backdrop-blur-sm">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Click to deconstruct with <strong>Meta Muse Spark</strong></span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
