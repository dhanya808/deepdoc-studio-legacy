# DeepDoc Studio 📑⚡
> **Multimodal PDF & Complex Document Intelligence powered by Meta AI**  
> *Submission for the Meta Global AI Developer Hackathon 2026 (Indie Developer Track)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Meta Model API](https://img.shields.io/badge/Meta_Model_API-SAM_3.1_%7C_Muse_Spark_%7C_Muse_Wonder-0081FB.svg)](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)
[![Inference Partners](https://img.shields.io/badge/Inference-Modal_%7C_Fireworks_%7C_Baseten-black.svg)](https://modal.com)

---

## 🚀 Overview

Standard OCR pipelines and conventional LLMs treat complex documents as flat text strings. When given:
- **Financial 10-K filings** (dense multi-period balance sheets, footnote schedules, CapEx trajectories)
- **Scientific & ML research papers** (multi-column typography, embedded benchmark plots, Riemannian equations)
- **Clinical trial reports** (dose-response tables, pharmacokinetic Hill kinetics)

...they scramble tabular columns, destroy mathematical precision, hallucinate figures, and fail to cross-reference visual charts with numerical tables.

**DeepDoc Studio** fixes this fundamentally. Rather than flattening pages into lossy OCR text, it treats documents as visual scenes using **Meta SAM 3.1 (Segment Anything)**, isolates every table, chart, and equation into atomic semantic masks, and passes them to **Meta Muse Spark** and **Meta Muse Wonder** for structured extraction, LaTeX decompilation, and cross-modal reasoning.

---

## ✨ Key Features & Capabilities

### 1. Zero-Shot Visual Segmentation with Meta SAM 3.1
- Treats pages as high-resolution visual scenes rather than flat text.
- Automatically isolates and color-codes:
  - 🟢 **Tables** (Financial matrices, balance sheets, trial cohorts)
  - 🟣 **Charts & Figures** (Bar charts, loss scaling curves, trends)
  - 🟡 **Mathematical Formulas** (Inline & display equations)
  - 🔵 **Text & Headings** (Multi-column research narratives)
- Interactive, glowing bounding masks with real-time confidence metrics.

### 2. Table Studio (Powered by Meta Muse Spark)
- Click on any segmented table to instantly deconstruct it.
- **Live Interactive Data Grid**: Filter, search, and sort rows in real time.
- **Instant Export Formats**:
  - 📥 Clean **CSV** download
  - 📋 Structured **JSON** payload
  - 🗄️ Ready-to-run **SQL DDL & Insert queries**
  - 🐍 Executable **Python / Pandas ingestion script**

### 3. LaTeX Equation Decompiler (Powered by Meta Muse Spark)
- Converts segmented formula bounding boxes into clean, copyable LaTeX syntax.
- Provides a **deconstructed variable breakdown table** mapping each mathematical symbol ($\hat{U}(\theta)$, $\mathcal{K}_{\text{QUA}}$, $\Omega_{\text{margin}}$) to its exact semantic meaning.
- Generates step-by-step mathematical derivation notes.

### 4. Cross-Modal Document Copilot (Powered by Meta Muse Wonder)
- Solves questions that require **simultaneously reading visual charts on Page 2 and tabular numbers on Page 1**:
  - *"Calculate YoY revenue growth from Table 1 and correlate it with the quarterly AI CapEx expansion chart on Page 2."*
  - *"How does QUA scale memory at 512k tokens compared to FlashAttention-3?"*
- Shows an expandable **Muse Reasoning Chain** detailing every extraction step.
- Embeds clickable **citation badges** that jump to and highlight referenced document regions.

### 5. One-Click Executive Intelligence Brief
- Generates an audit-ready executive intelligence report summarizing key findings, segment metrics, and strategic takeaways with 1-click Markdown export and print-to-PDF formatting.

---

## 🏛️ System Architecture

```
                                ┌────────────────────────────────────┐
                                │       User Uploads Complex PDF     │
                                │   (10-K Report / Research Paper)   │
                                └─────────────────┬──────────────────┘
                                                  │
                                        [PDF.js Page Renderer]
                                                  │
                                                  ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Meta SAM 3.1 Segmentation Engine                               │
│        (Isolates Bounding Regions: 📊 Tables | 📈 Charts | 🧮 Math Formulas | 📝 Narratives)     │
└─────────────────────────────────────────────────┬────────────────────────────────────────────────┘
                                                  │
                                                  ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       DeepDoc Studio UI                                          │
│     Left: Interactive Document Canvas with color-coded, glowing bounding overlays & HUD tooltips  │
│     Right: Segment Studio (Data Grid, LaTeX, SQL) & Multimodal Copilot (Cross-Modal Chat)        │
└───────────────────────┬──────────────────────────────────────────────────┬───────────────────────┘
                        │                                                  │
                        ▼                                                  ▼
            [Table & Formula Extractor]                       [Multimodal Visual Reasoning]
                  Meta Muse Spark                                    Meta Muse Wonder
     • Table ➔ CSV / JSON / SQL / Pandas               • Multi-page chart & table cross-correlation
     • Formula ➔ LaTeX & Symbol Dictionary             • Step-by-step reasoning chain with citations
```

---

## 🧠 Meta Products & Inference Integration

| Meta Product / Partner | Role in DeepDoc Studio |
| :--- | :--- |
| **Meta SAM 3.1** | Zero-shot visual document region segmentation (tables, formulas, figures, text columns). |
| **Meta Muse Spark** | High-speed structured extraction: Table to CSV/JSON/SQL and formula decompilation to LaTeX. |
| **Meta Muse Wonder** | Flagship multimodal model performing cross-page reasoning across charts and text simultaneously. |
| **Meta Muse Code** | Automated generation of Python/Pandas transformation scripts and SQL schemas. |
| **Modal** | Serverless GPU hosting for SAM 3.1 vision inference endpoints. |
| **Fireworks AI** | Low-latency streaming generation for Muse Spark reasoning models. |
| **Baseten** | High-throughput 2M TPM model endpoint serving. |

---

## 🛠️ Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+) & npm

### Installation
```bash
# Clone the repository
git clone https://github.com/Dhanya808/deepdoc-studio.git
cd deepdoc-studio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 📋 Hackathon Submission Details

- **Team Name**: Dhanya808 (Dhanya R M)
- **Track**: Indie Developer Track
- **Problem Statement**: Build for Your World (Research, Finance & Knowledge Work)
- **GitHub Repository**: [https://github.com/Dhanya808/deepdoc-studio](https://github.com/Dhanya808/deepdoc-studio)
- **License**: MIT License
