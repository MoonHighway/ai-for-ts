# next-chat, the browser version 🖥️

A minimal Next.js (App Router) app showing the canonical Vercel AI SDK streaming
chat with `useChat`. This is the "put it in a browser" companion to lesson 02.

## Run it

```bash
npm install
cp .env.example .env     # paste your AI Gateway key (same one as the parent repo)
npm run dev              # → http://localhost:3000
```

Type a message and watch the reply stream in token-by-token.

## What's where

| File | Role |
|------|------|
| `app/api/chat/route.ts` | server route, `streamText` → `toUIMessageStreamResponse()` |
| `app/page.tsx` | client, `useChat` renders `message.parts` |
| `app/layout.tsx` | root layout |

## Things to try

- Change the `model` string in `route.ts` (e.g. `openai/gpt-5.5`).
- Give the bot a persona via the `system` prompt.
- Render a typing indicator with `status` (already wired up).
- Day 3 preview: add a `tool()` to the route and watch new `part` types appear in
  the `parts` array. 👀

> Self-contained on purpose: its own `package.json` so it doesn't drag Next into
> the parent scripts project.
