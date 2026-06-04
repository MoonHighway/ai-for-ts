# AI for TypeScript Developers 🌲

**CascadiaJS 2026 · Thursday, June 4 · with Eve Porcello**

Today we build real AI features in TypeScript with the **Vercel AI SDK (v6)** and
the **AI Gateway**. We start with a single model call and end with a production-ready
RAG feature: streaming, structured, type-safe, and cost-aware.

You should be comfy with TypeScript, Node, and `async/await`. No AI experience required.

---

## ⚙️ Setup

1. **Node 20+**: `node --version`.
2. **Clone & install:**
   ```bash
   npm install
   ```
3. **Get an AI Gateway key**: [Vercel dashboard](https://vercel.com/dashboard) →
   AI Gateway → API Keys. Then:
   ```bash
   cp .env.example .env   # paste your key into .env
   ```
4. **Smoke test:**
   ```bash
   npm run hello
   ```
   If you get a two-sentence answer, you're ready. 🎉

> 💡 **The Gateway is the star.** One key, every model. Open `src/config.ts` and
> change `MODEL` to `openai/gpt-5.5` or `google/gemini-3.1-pro-preview`, every
> example re-routes. No new SDK, no new key. That's the whole pitch.

---

## 🗺️ The day

### Morning, AI SDK essentials
| # | Lesson | Run |
|---|--------|-----|
| 00 | [Setup & the SDK in 5 minutes](./lessons/00-setup.md) | `npm run hello` |
| 01 | [Fundamentals: generate & stream](./lessons/01-fundamentals.md) | `npm run stream` |
| 02 | [Streaming chat UI with `useChat`](./lessons/02-streaming-ui.md) | (see `next-chat/`) |
| 03 | [Prompts, messages & responses](./lessons/03-prompts-and-responses.md) | `npm run system` |
| 04 | [Structured outputs with Zod](./lessons/04-structured-outputs.md) | `npm run structured` |

### Afternoon, shipping advanced patterns
| # | Lesson | Run |
|---|--------|-----|
| 05 | [Retrieval Augmented Generation (RAG)](./lessons/05-rag.md) | `npm run embeddings` · `npm run rag` |
| 06 | [Production AI features](./lessons/06-production.md) | `npm run errors` · `npm run production` |

## 🔬 Labs

Each lesson has a matching lab in [`labs/`](./labs/). **The labs follow one project
across the whole day** — you pick it during setup and add each lesson's pattern to it.
No starter code, no prescribed answer. Use your AI tools to build.

| Lab | What you add |
|-----|-------------|
| [00 · Pick your project](./labs/00-pick-your-project.md) | Project brief + initial scaffold |
| [01 · First AI call](./labs/01-first-call.md) | `generateText` or `streamText` |
| [02 · Streaming UI](./labs/02-streaming-ui.md) | `useChat` browser interface |
| [03 · Sharpen your prompts](./labs/03-prompts.md) | System prompt + few-shot examples |
| [04 · Structured output](./labs/04-structured-output.md) | Zod schema + `generateObject` |
| [05 · RAG](./labs/05-rag.md) | Knowledge base + retrieval |
| [06 · Ship it](./labs/06-ship-it.md) | Caching, fallbacks, cost awareness |

## 🏃 All the scripts

| Command | What it shows |
|---------|---------------|
| `npm run hello` | one-shot generation through the Gateway |
| `npm run stream` | token streaming |
| `npm run chat` | multi-turn terminal chat |
| `npm run system` | system prompts & few-shot messages |
| `npm run structured` | typed output with `generateObject` + Zod |
| `npm run errors` | retries, fallbacks, timeouts |
| `npm run embeddings` | semantic similarity |
| `npm run rag` | full tiny RAG pipeline (`npm run rag "your question"`) |
| `npm run production` | caching, rate limiting, cost tracking |

## 🖥️ The browser chat (`next-chat/`)

A minimal Next.js app showing the canonical `useChat` streaming UI. It's
self-contained with its own install, see [`next-chat/README.md`](./next-chat/README.md).

Let's build. ✨
