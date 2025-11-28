*AdhyayanX is an AI-powered Teacher Assistant designed for coaching institutes and educators. It automates the entire academic workflow — starting with PDF-first content processing - to generate:*

* Class notes
* Revision materials
* Next-day teaching plans
* Daily student reports
* Syllabus tracking & progress mapping

Built using a modern **React + NestJS + AI + Vector Search** architecture, AdhyayanX converts uploaded PDFs into actionable, high-quality teaching outputs that save teachers hours every day.


## **Core Features**

* **PDF Upload & Parsing**
  Upload PDFs and automatically extract structured content using advanced text-processing.

* **AI-Generated Notes & Summaries**
  Create clean, student-friendly notes directly from source material.

* **Automated Revision Sheets**
  Smart revision content generated from extracted concepts.

* **Next-Day Class Plans**
  AI plans your next class using your syllabus coverage + uploaded materials.

* **Daily Reports for Institutes**
  Auto-generated reports summarizing topics taught, student progress, and upcoming tasks.

* **RAG-based Question Answering**
  Ask questions about any uploaded PDF, using Retrieval-Augmented Generation.

* **Teacher Dashboard**
  View documents, job statuses, generated content, and analytics.

## **Tech Stack**

### **Frontend**

* React (Vite + TypeScript)
* Tailwind CSS
* React Query / Axios (API communication)
* Supabase Auth or custom JWT

### **Backend**

* NestJS (TypeScript)
* BullMQ + Upstash Redis for async workers
* Python (PyMuPDF) for PDF text extraction
* Prisma ORM
* Postgres (Neon / Supabase)

### **AI & Vector Search**

* OpenAI Embeddings / Local Embeddings (Ollama)
* Qdrant Vector Database
* Retrieval-Augmented Generation pipeline

### **Storage**

* Supabase Storage / S3 compatible layer
* Direct PDF uploads using presigned URLs

## **Features Under Development**

* OCR for scanned PDFs
* Multi-teacher collaboration
* Multi-tenant institute system
* Editable notes inside dashboard
* Auto-generated progress trackers
* Offline-first mobile experience (PWA)

---

## **Project Structure**

```
adhyayanx/
│
├── apps/
│   ├── frontend/        # React (Vite) web app
│   ├── backend/         # NestJS API server
│   ├── worker/          # BullMQ worker
│   └── extractor/       # Python PDF extraction service
│
├── infra/
│   ├── docker/          # Docker & infra configs
│   ├── scripts/         # Deployment helpers
│   └── env/             # env.example + templates
│
├── docs/
│   ├── architecture/    # System diagrams + flows
│   ├── api/             # OpenAPI spec
│   └── onboarding.md    # Dev onboarding guide
│
└── README.md
```
---

### **1. Clone the repository**

```sh
git clone https://github.com/MrigeshDeshpande/adhyayanx.git
cd adhyayanx
```


### **2. Install dependencies**

Frontend:

```sh
cd apps/frontend
npm install
```

Backend:

```sh
cd apps/backend
npm install
```

Worker:

```sh
cd apps/worker
npm install
```

Extractor:

```sh
cd apps/extractor
pip install -r requirements.txt
```


### **3. Start servers**

Frontend:

```sh
npm run dev
```

Backend:

```sh
npm run start:dev
```

Worker:

```sh
npm run start
```

Extractor (Python):

```sh
python src/main.py
```

##  **How the Pipeline Works**

1. Teacher uploads a PDF → goes to Supabase Storage
2. Backend creates a PDF record + enqueues processing job
3. Worker fetches the PDF → sends to Python extractor
4. Extractor returns chunks → backend embeds them
5. Embeddings stored in Qdrant
6. User asks a question → system retrieves best chunks
7. RAG pipeline creates accurate AI answers
8. Notes / summaries / reports generated on demand


##  **Roadmap**

* [ ] Real-time collaborative notes editor
* [ ] Full syllabus mapping engine
* [ ] Institute admin dashboards
* [ ] AI-powered test paper generator
* [ ] Student performance analytics
* [ ] Roles & permissions (Admin/Teacher/Staff)



## **Contributing**

We welcome contributions from developers interested in AI, education tech, or full-stack engineering.
Open an issue or submit a PR with clear descriptions.

<!--## License

MIT License © 2025 AdhyayanX

-->
