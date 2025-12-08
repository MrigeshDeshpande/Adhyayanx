# **AdhyayanX — AI-Powered Teaching Assistant (v1)**

AdhyayanX is an AI-driven platform designed to help coaching institutes and teachers automate their daily academic operations.
The goal of this project is to streamline tasks such as:

* Generating class notes
* Creating revision material
* Planning next-day lessons
* Preparing daily student reports
* Mapping and tracking syllabus progress

**v1 is built entirely using Next.js** to move fast and keep everything in a single codebase.
The architecture is intentionally simple but structured so that heavy processing tasks can be moved to separate services in future versions.

---

## **Getting Started**

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

You can start editing the project by modifying files inside the `app/` directory.
Changes will automatically refresh in the browser.

---

## **About This Build**

* Built with **Next.js (App Router)**
* Uses **Prisma + PostgreSQL** for data
* Includes basic API routes for early features
* Designed to be extendable as the platform grows
* Future versions may introduce dedicated backend services (NestJS) for tasks like PDF processing, search indexing, and authentication, but **v1 stays fully monolithic on Next.js** for speed and simplicity.
