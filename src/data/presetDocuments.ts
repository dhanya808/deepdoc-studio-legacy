import { DocumentItem } from '../types';

export const PRESET_DOCUMENTS: DocumentItem[] = [
  {
    id: 'meta-financial-10k',
    title: 'Meta AI & Compute Infrastructure 10-K Performance Report',
    category: 'Financial 10-K',
    totalPages: 2,
    authorOrEntity: 'Meta Platforms, Inc. / SEC Form 10-K',
    date: 'Q3/Q4 2026',
    description: 'Comprehensive financial statement detailing AI capital expenditures, data center fleet scaling, and Family of Apps operational revenue.',
    pages: [
      {
        pageNumber: 1,
        title: 'Consolidated Statements of Income & R&D Allocations',
        pageImageUrl: '',
        segments: [
          {
            id: 'seg-meta-p1-heading',
            type: 'heading',
            label: 'Header & SEC Filing Designation',
            confidence: 0.99,
            bbox: { x: 5, y: 4, width: 90, height: 8 },
            pageNumber: 1,
            rawText: 'UNITED STATES SECURITIES AND EXCHANGE COMMISSION — FORM 10-K (CONSOLIDATED OPERATIONS)'
          },
          {
            id: 'seg-meta-p1-text-intro',
            type: 'text',
            label: 'Executive Narrative',
            confidence: 0.96,
            bbox: { x: 5, y: 14, width: 90, height: 11 },
            pageNumber: 1,
            rawText: 'Our AI research and infrastructure investments accelerated in 2026, driven by next-generation foundation model training (Muse series, SAM 3.1) and custom silicon deployment (MTIA Gen 2). Total capital expenditures for computing capacity grew 38% year-over-year.'
          },
          {
            id: 'seg-meta-p1-table-revenue',
            type: 'table',
            label: 'Consolidated Statement of Operations ($ in Millions)',
            confidence: 0.985,
            bbox: { x: 5, y: 28, width: 90, height: 42 },
            pageNumber: 1,
            tableData: {
              summary: 'Three and Twelve Months Ended Operational Breakdown comparing 2025 vs 2026 fiscal periods.',
              unit: 'USD in Millions',
              headers: ['Financial Metric', 'Q3 2025', 'Q4 2025', 'Q3 2026', 'Q4 2026', 'YoY Growth (%)'],
              rows: [
                ['Advertising Revenue', 39885, 43100, 46720, 51340, '+19.1%'],
                ['Reality Labs Revenue', 270, 1070, 480, 1420, '+32.7%'],
                ['AI Cloud & Model API Revenue', 110, 240, 680, 1190, '+395.8%'],
                ['Total Consolidated Revenue', 40265, 44410, 47880, 53950, '+21.5%'],
                ['Cost of Revenue (Infrastructure)', 7430, 8120, 9340, 10450, '+28.7%'],
                ['Research & Development (AI / Systems)', 10390, 11450, 14210, 16180, '+41.3%'],
                ['Operating Income', 17350, 19410, 18890, 20950, '+7.9%'],
                ['Net Capital Expenditures (CapEx)', 8260, 9150, 12430, 14620, '+59.8%']
              ]
            }
          },
          {
            id: 'seg-meta-p1-formula-margin',
            type: 'formula',
            label: 'Operating Margin & Compute Depreciation Formula',
            confidence: 0.972,
            bbox: { x: 5, y: 73, width: 90, height: 21 },
            pageNumber: 1,
            formulaData: {
              latex: '\\Omega_{\\text{margin}} = \\frac{R_{\\text{total}} - (C_{\\text{infra}} + D_{\\text{GPU}} + \\sum_{i} R\\&D_i)}{R_{\\text{total}}} \\times 100\\%',
              description: 'Consolidated Adjusted Operating Margin accounting for accelerated 4-year straight-line server and cluster GPU depreciation schedule.',
              variables: [
                { symbol: '\\Omega_{\\text{margin}}', meaning: 'Adjusted Operating Margin percentage' },
                { symbol: 'R_{\\text{total}}', meaning: 'Total consolidated quarterly revenue' },
                { symbol: 'C_{\\text{infra}}', meaning: 'Direct data center cooling, power, and colocation lease costs' },
                { symbol: 'D_{\\text{GPU}}', meaning: 'Amortized depreciation of accelerator cards and optical interconnect fabric' },
                { symbol: 'R\\&D_i', meaning: 'Discretionary research allocations across model training pipelines' }
              ],
              derivationNotes: 'Depreciation useful life for AI server assets adjusted from 5 years to 4 years beginning fiscal year 2025.'
            }
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'AI Cluster Scaling & Capital Allocation Trajectory',
        pageImageUrl: '',
        segments: [
          {
            id: 'seg-meta-p2-chart-capex',
            type: 'chart',
            label: 'Quarterly AI Infrastructure CapEx vs Model Training Capacity',
            confidence: 0.981,
            bbox: { x: 5, y: 6, width: 90, height: 46 },
            pageNumber: 2,
            chartData: {
              title: 'Quarterly AI Infrastructure CapEx ($ Billions)',
              chartType: 'bar',
              xAxis: 'Fiscal Quarter',
              yAxis: 'Capital Expenditures ($B)',
              dataPoints: [
                { label: 'Q1 2025', value: 6.8 },
                { label: 'Q2 2025', value: 7.5 },
                { label: 'Q3 2025', value: 8.3 },
                { label: 'Q4 2025', value: 9.2 },
                { label: 'Q1 2026', value: 10.4 },
                { label: 'Q2 2026', value: 11.6 },
                { label: 'Q3 2026', value: 12.4 },
                { label: 'Q4 2026', value: 14.6 }
              ],
              insights: [
                'CapEx increased from $6.8B in Q1 2025 to $14.6B in Q4 2026 (+114.7% expansion).',
                'GPU and TPU cluster capacity expanded to over 600,000 H100-equivalent accelerators.',
                'Direct correlation observed between R&D expenditure spikes and the rollout of the Muse & SAM 3.1 model families.'
              ]
            }
          },
          {
            id: 'seg-meta-p2-text-notes',
            type: 'text',
            label: 'Footnotes & Forward-Looking Compute Guidance',
            confidence: 0.95,
            bbox: { x: 5, y: 55, width: 90, height: 38 },
            pageNumber: 2,
            rawText: 'Note 4: Commitments and Contingencies for High-Density Power Purchase Agreements (PPAs). In 2026, the company entered into 2.4 Gigawatts of carbon-free clean power contracts with regional nuclear and geothermal utilities to power mega-clusters for autonomous agent research. Forward-looking full-year 2027 CapEx is projected between $58B and $65B.'
          }
        ]
      }
    ]
  },
  {
    id: 'quantum-transformer-paper',
    title: 'Quantum-Enhanced Attention: Scaling Transformers on Riemannian Manifolds',
    category: 'Scientific Research',
    totalPages: 2,
    authorOrEntity: 'Deep Research Lab / NeurIPS Proceedings',
    date: 'November 2026',
    description: 'Breakthrough machine learning publication introducing sub-quadratic unitary self-attention mechanisms for multi-gigatoken context windows.',
    pages: [
      {
        pageNumber: 1,
        title: 'Theoretical Framework & Unitary Attention Kernel',
        pageImageUrl: '',
        segments: [
          {
            id: 'seg-quant-p1-heading',
            type: 'heading',
            label: 'Article Title & Author Affiliations',
            confidence: 0.995,
            bbox: { x: 6, y: 5, width: 88, height: 10 },
            pageNumber: 1,
            rawText: 'QUANTUM-ENHANCED ATTENTION: SUBLINEAR COMPLEXITY ON RIEMANNIAN MANIFOLDS'
          },
          {
            id: 'seg-quant-p1-abstract',
            type: 'text',
            label: 'Abstract & Problem Formulation',
            confidence: 0.97,
            bbox: { x: 6, y: 17, width: 88, height: 16 },
            pageNumber: 1,
            rawText: 'Abstract: Standard softmax attention scales as O(N^2) in sequence length, bottlenecking million-token reasoning. We propose Quantum Unitary Attention (QUA), projecting sequence tokens into a continuous Hilbert space via parameterized unitary Lie group transforms. We prove bounded approximation error epsilon < 1e-4 while cutting FLOPs by 4.2x.'
          },
          {
            id: 'seg-quant-p1-eq1',
            type: 'formula',
            label: 'Equation (1): Unitary Kernel Operator',
            confidence: 0.988,
            bbox: { x: 6, y: 36, width: 88, height: 26 },
            pageNumber: 1,
            formulaData: {
              latex: '\\mathcal{K}_{\\text{QUA}}(Q_i, K_j) = \\mathrm{Tr}\\left( \\hat{U}(\\theta)^\\dagger \\cdot \\left[ \\frac{|q_i\\rangle \\langle k_j|}{\\sqrt{d_k}} \\right] \\cdot \\hat{U}(\\theta) \\right) \\exp\\left(-\\frac{\\|q_i - k_j\\|^2_{\\mathcal{M}}}{2\\sigma^2}\\right)',
              description: 'Parameterized unitary attention kernel mapping queries and keys onto a Riemannian manifold M with geodesic distance damping.',
              variables: [
                { symbol: '\\mathcal{K}_{\\text{QUA}}', meaning: 'Quantum Unitary Attention kernel Gram matrix value' },
                { symbol: '\\hat{U}(\\theta)', meaning: 'Unitary operator parameterized by variational angles theta in SU(2^n)' },
                { symbol: '|q_i\\rangle, |k_j\\rangle', meaning: 'State vector encodings of token queries and keys' },
                { symbol: '\\|\\cdot\\|^2_{\\mathcal{M}}', meaning: 'Riemannian geodesic distance metric on the compact manifold' },
                { symbol: '\\sigma', meaning: 'Adaptive gaussian variance bandwidth' }
              ],
              derivationNotes: 'Trace invariance guarantees conservation of total probability density, eliminating softmax numerical overflow.'
            }
          },
          {
            id: 'seg-quant-p1-eq2',
            type: 'formula',
            label: 'Equation (2): Sub-Quadratic Manifold Gradient Update',
            confidence: 0.982,
            bbox: { x: 6, y: 65, width: 88, height: 28 },
            pageNumber: 1,
            formulaData: {
              latex: '\\nabla_{\\theta} \\mathcal{L} = \\sum_{t=1}^{T} \\mathbb{E}_{\\tau \\sim \\pi_\\theta} \\left[ \\nabla_\\theta \\log \\mathcal{P}_\\theta(y_t | y_{<t}) \\cdot \\oint_{\\partial \\mathcal{M}} \\omega_{\\text{symplectic}} \\right]',
              description: 'Natural Riemannian gradient update integrating symplectic differential forms over boundary manifold dM.',
              variables: [
                { symbol: '\\nabla_{\\theta} \\mathcal{L}', meaning: 'Riemannian natural gradient of cross-entropy loss' },
                { symbol: '\\omega_{\\text{symplectic}}', meaning: 'Closed non-degenerate 2-form governing phase space conservation' },
                { symbol: '\\mathcal{P}_\\theta', meaning: 'Next-token autoregressive probability distribution' }
              ]
            }
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Empirical Benchmarks & Scaling Laws',
        pageImageUrl: '',
        segments: [
          {
            id: 'seg-quant-p2-table-benchmarks',
            type: 'table',
            label: 'Table 1: Benchmark Comparison Across Context Lengths',
            confidence: 0.991,
            bbox: { x: 6, y: 6, width: 88, height: 42 },
            pageNumber: 2,
            tableData: {
              summary: 'Hardware execution profiling comparing Standard FlashAttention-3 vs QUA Kernel on 8x H100 80GB SXM5 nodes.',
              headers: ['Model Variant', 'Context Window', 'Tokens/sec', 'VRAM Footprint', 'Perplexity (WikiText-103)', 'Speedup'],
              rows: [
                ['FlashAttention-3', '32k', '14,200', '18.4 GB', '5.12', '1.0x (Baseline)'],
                ['FlashAttention-3', '128k', '3,450', '68.2 GB', '4.98', '1.0x (Baseline)'],
                ['FlashAttention-3', '512k', 'OOM', '> 80 GB', 'N/A', 'Failed'],
                ['Linear Attention (Mamba2)', '128k', '18,900', '12.1 GB', '5.84', '5.4x (Quality Drop)'],
                ['QUA (Our Model)', '32k', '21,400', '9.2 GB', '4.78', '1.51x'],
                ['QUA (Our Model)', '128k', '19,800', '11.8 GB', '4.62', '5.74x'],
                ['QUA (Our Model)', '512k', '17,200', '14.5 GB', '4.55', 'Infinite (Stable)'],
                ['QUA (Our Model)', '2.0 Million', '14,100', '22.3 GB', '4.51', 'New Frontier']
              ]
            }
          },
          {
            id: 'seg-quant-p2-chart-scaling',
            type: 'chart',
            label: 'Figure 3: Training Loss Scaling Trajectory',
            confidence: 0.978,
            bbox: { x: 6, y: 51, width: 88, height: 43 },
            pageNumber: 2,
            chartData: {
              title: 'Validation Perplexity vs Effective Sequence Length',
              chartType: 'line',
              xAxis: 'Sequence Length (k tokens)',
              yAxis: 'Perplexity (Lower is Better)',
              dataPoints: [
                { label: '8k', value: 5.4 },
                { label: '32k', value: 4.8 },
                { label: '64k', value: 4.7 },
                { label: '128k', value: 4.62 },
                { label: '256k', value: 4.58 },
                { label: '512k', value: 4.55 },
                { label: '1024k', value: 4.52 },
                { label: '2048k', value: 4.51 }
              ],
              insights: [
                'Perplexity monotonically decreases up to 2M tokens without attention saturation or dilution.',
                'Memory consumption remains strictly sub-linear (O(N log N)) on standard tensor accelerators.',
                'Zero loss spikes observed across 500B token pre-training run.'
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'biomedical-trial-study',
    title: 'Phase II Oncology Trial: Kinase Inhibitor MT-409 Response Profile',
    category: 'Biomedical Report',
    totalPages: 1,
    authorOrEntity: 'Oncology Therapeutics Consortium',
    date: 'October 2026',
    description: 'Clinical trial patient cohort safety and dose-escalation pharmacokinetic pharmacodynamic (PK/PD) response data.',
    pages: [
      {
        pageNumber: 1,
        title: 'Cohort Efficacy & Pharmacokinetic Modeling',
        pageImageUrl: '',
        segments: [
          {
            id: 'seg-bio-p1-heading',
            type: 'heading',
            label: 'Trial Header & Protocol Identifier',
            confidence: 0.99,
            bbox: { x: 5, y: 4, width: 90, height: 8 },
            pageNumber: 1,
            rawText: 'PROTOCOL MT409-CLIN-202: MULTI-CENTER PHASE II COHORT EVALUATION'
          },
          {
            id: 'seg-bio-p1-table-cohorts',
            type: 'table',
            label: 'Table 2: Patient Response & Tumor Volume Reduction',
            confidence: 0.984,
            bbox: { x: 5, y: 15, width: 90, height: 38 },
            pageNumber: 1,
            tableData: {
              summary: 'Evaluated intent-to-treat cohort at Week 24 RECIST v1.1 response thresholds.',
              headers: ['Dose Group (mg/day)', 'Patients (N)', 'Complete Response', 'Partial Response', 'Objective Response Rate (ORR)', 'Grade 3+ Adverse Events'],
              rows: [
                ['Cohort A (50 mg)', 42, '2 (4.8%)', '11 (26.2%)', '31.0%', '4 (9.5%)'],
                ['Cohort B (100 mg)', 45, '5 (11.1%)', '19 (42.2%)', '53.3%', '7 (15.5%)'],
                ['Cohort C (150 mg)', 44, '9 (20.5%)', '22 (50.0%)', '70.5%', '11 (25.0%)'],
                ['Cohort D (200 mg)', 39, '10 (25.6%)', '20 (51.3%)', '76.9%', '19 (48.7%)']
              ]
            }
          },
          {
            id: 'seg-bio-p1-formula-hill',
            type: 'formula',
            label: 'Equation (3): Sigmoidal Emax Pharmacodynamic Model',
            confidence: 0.975,
            bbox: { x: 5, y: 56, width: 90, height: 38 },
            pageNumber: 1,
            formulaData: {
              latex: 'E(C) = E_0 + \\frac{(E_{\\max} - E_0) \\cdot C^\\gamma}{\\mathrm{EC}_{50}^\\gamma + C^\\gamma}',
              description: 'Four-parameter logistic Hill equation modeling tumor inhibition percentage as a function of plasma concentration C.',
              variables: [
                { symbol: 'E(C)', meaning: 'Observed therapeutic tumor growth inhibition percentage' },
                { symbol: 'E_0', meaning: 'Baseline tumor proliferation rate without drug exposure' },
                { symbol: 'E_{\\max}', meaning: 'Asymptotic maximal efficacy achievable (94.2% in vitro)' },
                { symbol: 'C', meaning: 'Steady-state unbound serum drug concentration (ng/mL)' },
                { symbol: '\\mathrm{EC}_{50}', meaning: 'Concentration producing 50% of maximum effect (64.3 ng/mL)' },
                { symbol: '\\gamma', meaning: 'Hill coefficient governing curve steepness and receptor cooperativity (gamma = 2.18)' }
              ]
            }
          }
        ]
      }
    ]
  }
];
