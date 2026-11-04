import React, { useState } from 'react';
import { DocumentSegment } from '../types';
import { 
  Table as TableIcon, 
  Sigma, 
  LineChart, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Code, 
  Database, 
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  X
} from 'lucide-react';
import { metaModelService } from '../services/metaModelService';

interface SegmentInspectorProps {
  segment: DocumentSegment | null;
  onClose: () => void;
  onAskAboutSegment: (segment: DocumentSegment) => void;
}

export const SegmentInspector: React.FC<SegmentInspectorProps> = ({
  segment,
  onClose,
  onAskAboutSegment,
}) => {
  const [activeTab, setActiveTab] = useState<'view' | 'code' | 'export'>('view');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [exportData, setExportData] = useState<{
    csv: string;
    json: string;
    sql: string;
    pandasCode: string;
  } | null>(null);

  if (!segment) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-500 bg-slate-900/40 border-l border-slate-800">
        <Sparkles className="w-10 h-10 text-slate-700 mb-3" />
        <h3 className="text-sm font-medium text-slate-400">No Segment Selected</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Click on any color-coded bounding region on the document canvas to deconstruct it with Meta Muse Spark.
        </p>
      </div>
    );
  }

  // Load export data on demand
  const handleLoadExportData = async () => {
    if (segment.type === 'table') {
      const data = await metaModelService.extractTableToFormats(segment);
      setExportData(data);
    }
  };

  const copyToClipboard = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 text-slate-200 overflow-hidden">
      {/* Inspector Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center space-x-2">
          {segment.type === 'table' && <TableIcon className="w-4 h-4 text-emerald-400" />}
          {segment.type === 'formula' && <Sigma className="w-4 h-4 text-amber-400" />}
          {segment.type === 'chart' && <LineChart className="w-4 h-4 text-purple-400" />}
          {segment.type === 'text' && <FileText className="w-4 h-4 text-cyan-400" />}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wide truncate max-w-[200px] xl:max-w-[260px]">
              {segment.label}
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              SAM 3.1 Confidence: {Math.round(segment.confidence * 100)}% · Page {segment.pageNumber}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => onAskAboutSegment(segment)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium shadow transition"
            title="Ask Muse Wonder about this element"
          >
            <Sparkles className="w-3 h-3" />
            <span>Ask AI</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-medium bg-slate-950/40 px-4">
        <button
          onClick={() => setActiveTab('view')}
          className={`py-2 px-3 border-b-2 transition ${
            activeTab === 'view'
              ? 'border-indigo-500 text-indigo-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Extracted View
        </button>
        {segment.type === 'table' && (
          <>
            <button
              onClick={() => {
                setActiveTab('code');
                handleLoadExportData();
              }}
              className={`py-2 px-3 border-b-2 transition ${
                activeTab === 'code'
                  ? 'border-indigo-500 text-indigo-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              SQL & Code
            </button>
            <button
              onClick={() => {
                setActiveTab('export');
                handleLoadExportData();
              }}
              className={`py-2 px-3 border-b-2 transition ${
                activeTab === 'export'
                  ? 'border-indigo-500 text-indigo-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Export
            </button>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4 text-xs">
        {/* ============================================================= */}
        {/* TAB: VIEW */}
        {/* ============================================================= */}
        {activeTab === 'view' && (
          <>
            {/* TABLE INSPECTION */}
            {segment.type === 'table' && segment.tableData && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {segment.tableData.rows.length} Rows · {segment.tableData.headers.length} Columns
                  </span>
                  <div className="relative">
                    <Search className="w-3 h-3 text-slate-500 absolute left-2 top-2" />
                    <input
                      type="text"
                      placeholder="Filter rows..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded pl-7 pr-2 py-1 text-xs text-slate-200 placeholder-slate-600 outline-none w-36 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="border border-slate-800 rounded-md overflow-x-auto bg-slate-950/80 shadow-inner max-h-[480px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300 sticky top-0">
                        {segment.tableData.headers.map((h, i) => (
                          <th key={i} className="p-2 font-semibold whitespace-nowrap text-[11px]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {segment.tableData.rows
                        .filter((row) =>
                          row.some((cell) =>
                            String(cell).toLowerCase().includes(tableSearch.toLowerCase())
                          )
                        )
                        .map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-2 font-mono text-[11px] whitespace-nowrap ${
                                  cIdx === 0 ? 'font-medium text-slate-200' : 'text-slate-300'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Synthesis: </span>
                  {segment.tableData.summary}
                </div>
              </div>
            )}

            {/* FORMULA INSPECTION */}
            {segment.type === 'formula' && segment.formulaData && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                      LaTeX Representation (Decompiled via Muse Spark)
                    </span>
                    <button
                      onClick={() => copyToClipboard(segment.formulaData!.latex, 'latex')}
                      className="flex items-center space-x-1 text-xs text-amber-300 hover:text-white bg-amber-900/40 hover:bg-amber-900/60 px-2 py-0.5 rounded transition"
                    >
                      {copiedFormat === 'latex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFormat === 'latex' ? 'Copied' : 'Copy LaTeX'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm text-amber-200 bg-slate-950 p-3 rounded border border-slate-800 overflow-x-auto">
                    {segment.formulaData.latex}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {segment.formulaData.description}
                  </p>
                </div>

                {/* Variable Breakdown */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    Deconstructed Variables & Symbols
                  </h4>
                  <div className="border border-slate-800 rounded-md overflow-hidden bg-slate-950">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-800/60 text-slate-300 border-b border-slate-800">
                          <th className="p-2 font-mono">Symbol</th>
                          <th className="p-2">Semantic Meaning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {segment.formulaData.variables.map((v, i) => (
                          <tr key={i} className="hover:bg-slate-800/20">
                            <td className="p-2 font-mono font-bold text-amber-400 whitespace-nowrap">
                              {v.symbol}
                            </td>
                            <td className="p-2 text-slate-300">{v.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {segment.formulaData.derivationNotes && (
                  <div className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Derivation Note: </span>
                    {segment.formulaData.derivationNotes}
                  </div>
                )}
              </div>
            )}

            {/* CHART INSPECTION */}
            {segment.type === 'chart' && segment.chartData && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-purple-950/20 border border-purple-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-purple-200">{segment.chartData.title}</h4>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300">
                      {segment.chartData.chartType}
                    </span>
                  </div>

                  {/* Render Visual Bars */}
                  <div className="bg-slate-950 p-4 rounded border border-slate-800">
                    <div className="flex items-end space-x-2 h-36 border-b border-slate-800 pb-2">
                      {segment.chartData.dataPoints.map((dp, idx) => {
                        const maxVal = Math.max(...segment.chartData!.dataPoints.map((d) => d.value));
                        const heightPct = Math.round((dp.value / maxVal) * 100);
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center">
                            <span className="text-[9px] font-mono text-purple-300 font-bold mb-1">
                              {dp.value}
                            </span>
                            <div
                              style={{ height: `${heightPct}%` }}
                              className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t"
                            />
                            <span className="text-[9px] text-slate-400 mt-1 truncate max-w-full">
                              {dp.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    Multimodal Vision Insights (Muse Wonder)
                  </h4>
                  <ul className="space-y-1.5">
                    {segment.chartData.insights.map((insight, i) => (
                      <li key={i} className="flex items-start space-x-2 text-slate-300 text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TEXT INSPECTION */}
            {(segment.type === 'text' || segment.type === 'heading') && (
              <div className="space-y-3">
                <div className="p-4 rounded bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed font-serif text-sm">
                  {segment.rawText}
                </div>
              </div>
            )}
          </>
        )}

        {/* ============================================================= */}
        {/* TAB: CODE (SQL & PANDAS) */}
        {/* ============================================================= */}
        {activeTab === 'code' && exportData && (
          <div className="space-y-4">
            {/* SQL Block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center space-x-1">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>SQL DDL & Insert Queries</span>
                </span>
                <button
                  onClick={() => copyToClipboard(exportData.sql, 'sql')}
                  className="flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  {copiedFormat === 'sql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'sql' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-48">
                {exportData.sql}
              </pre>
            </div>

            {/* Pandas Block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center space-x-1">
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Python / Pandas Ingestion Code</span>
                </span>
                <button
                  onClick={() => copyToClipboard(exportData.pandasCode, 'pandas')}
                  className="flex items-center space-x-1 text-slate-400 hover:text-white"
                >
                  {copiedFormat === 'pandas' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'pandas' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48">
                {exportData.pandasCode}
              </pre>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB: EXPORT (CSV & JSON) */}
        {/* ============================================================= */}
        {activeTab === 'export' && exportData && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-semibold text-white">Export Segment Artifacts</h4>
              <p className="text-xs text-slate-400">
                Download structured dataset representations extracted directly by Meta Muse Spark.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => downloadFile(exportData.csv, `${segment.label}.csv`, 'text/csv')}
                  className="flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded font-medium transition"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={() => downloadFile(exportData.json, `${segment.label}.json`, 'application/json')}
                  className="flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded font-medium transition"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Download JSON</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500">Raw JSON Payload</span>
              <pre className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                {exportData.json}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
