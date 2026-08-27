# DocuAI — AI Code Documentation Generator

DocuAI is a developer tool that turns source code into clear, structured technical
documentation using Generative AI. Paste code, pick a language and a documentation
format, and get Markdown documentation you can copy, download or revisit later.

## Features

- Two-panel developer workspace (code editor + rendered documentation)
- 11 languages and 5 documentation formats (Technical, Simple Explanation, Javadoc, Markdown, API)
- Code editor with line numbers, tab support, line/character counter, Clear and Try Example
- AI generation through a **secure server function** — the API key never reaches the browser
- Markdown rendering (headings, lists, tables, fenced code blocks)
- Copy / Download (.md) / Regenerate
- History page backed by the database, with view, delete and Clear History (with confirmation)
- Dark (default) and light theme, fully responsive, toasts, loading skeletons and error states

## Tech stack

React 19 · TypeScript · Vite · TanStack Start/Router · Tailwind CSS v4 · shadcn/ui ·
lucide-react · Lovable Cloud (Postgres database) · Lovable AI Gateway (Generative AI)

## Project structure

```
src/
├── components/        CodeEditor, DocumentationViewer, LanguageSelector,
│                      DocumentationTypeSelector, GenerateButton, Navbar,
│                      Footer, HistoryCard, Markdown, ui/ (shadcn)
├── routes/            index.tsx (Generator), history.tsx, about.tsx, privacy.tsx
├── services/          aiService.ts  (client-side facade + user-facing error mapping)
├── hooks/             useTheme.tsx, useHistory.ts
├── lib/               docs.functions.ts (server function), ai-gateway.server.ts
│                      (prompt + provider, server-only), session.ts
├── types/             languages, documentation types, HistoryEntry
└── styles.css         design tokens (colors, typography, shadows, markdown styles)
```

## AI integration (server-side only)

`src/lib/docs.functions.ts` exposes a `createServerFn` POST endpoint that:

1. validates input with Zod,
2. reads the API key from the server environment (`LOVABLE_API_KEY`, falling back to `AI_API_KEY`),
3. calls the AI gateway with a structured system prompt (`src/lib/ai-gateway.server.ts`),
4. returns only the generated Markdown, mapping provider failures to safe error codes.

No key, prompt or provider detail is ever exposed to the client. To swap in a different
provider, change only `ai-gateway.server.ts`.

## Running locally

```bash
bun install     # or: npm install
bun run dev     # or: npm run dev
```

The app starts on http://localhost:8080.

Environment variables (server-side, in `.env` — never commit real values):

```
AI_API_KEY=your-ai-api-key          # or LOVABLE_API_KEY when running on Lovable
VITE_SUPABASE_URL=...               # provided automatically by Lovable Cloud
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Database

Table `documentation_history`:

| column | type |
| --- | --- |
| id | uuid (pk) |
| session_id | text |
| source_code | text |
| language | text |
| documentation_type | text |
| generated_documentation | text |
| created_at | timestamptz |

Row Level Security is enabled. There is no login, so history is scoped per browser
session id and should not be used for confidential source code.

## Build

```bash
bun run build
```
