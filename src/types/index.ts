export type SegmentType = 'table' | 'chart' | 'formula' | 'text' | 'heading';

export interface BoundingBox {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  width: number; // percentage
  height: number; // percentage
}

export interface DocumentSegment {
  id: string;
  type: SegmentType;
  label: string;
  confidence: number;
  bbox: BoundingBox;
  pageNumber: number;
  previewUrl?: string;
  rawText?: string;
  // Specific parsed payloads:
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    summary: string;
    unit?: string;
  };
  formulaData?: {
    latex: string;
    description: string;
    variables: { symbol: string; meaning: string }[];
    derivationNotes?: string;
  };
  chartData?: {
    title: string;
    chartType: 'bar' | 'line' | 'scatter' | 'pie';
    xAxis: string;
    yAxis: string;
    dataPoints: { label: string; value: number }[];
    insights: string[];
  };
}

export interface DocumentPage {
  pageNumber: number;
  title: string;
  pageImageUrl: string;
  segments: DocumentSegment[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Financial 10-K' | 'Scientific Research' | 'Biomedical Report' | 'Custom Upload';
  totalPages: number;
  authorOrEntity: string;
  date: string;
  description: string;
  pages: DocumentPage[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  referencedSegmentIds?: string[];
  modelUsed?: 'Muse Wonder (Multimodal)' | 'Muse Spark (Reasoning)' | 'SAM 3.1 Segmenter' | 'Llama 3.2 Vision';
  executionTimeMs?: number;
  thinkingSteps?: string[];
}

export type MetaModel = 'muse-wonder' | 'muse-spark' | 'sam-3.1' | 'llama-3.2-vision';

export interface PartnerConfig {
  metaApiKey: string;
  modalEndpointUrl: string;
  modalApiKey: string;
  fireworksApiKey: string;
  basetenApiKey: string;
  activeInferenceEngine: 'meta-api' | 'modal' | 'fireworks' | 'baseten';
}
