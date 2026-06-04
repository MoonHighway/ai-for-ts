# 02 · Streaming chat UI with `useChat`

> ⏱️ ~35 min · code in [`next-chat/`](../next-chat/)

Terminal chat is great for learning. Now let's put it in a browser the way you'd
actually ship it, with the AI SDK's React hook, `useChat`.

## The two halves of a chat app

```
Browser (useChat)  ⇄  /api/chat route (streamText)  ⇄  AI Gateway
```

### The server route, `app/api/chat/route.ts`

```ts
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

Two new pieces vs. the terminal version:
- **`convertToModelMessages`** turns the rich UI messages (with their `parts`)
  into the plain messages the model wants.
- **`toUIMessageStreamResponse()`** packages the stream into an HTTP response the
  `useChat` hook knows how to read.

### The client: `app/page.tsx`

```tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
          {m.parts.map((part, i) =>
            part.type === 'text' ? <span key={i}>{part.text}</span> : null,
          )}
        </div>
      ))}
      <form onSubmit={(e) => { e.preventDefault(); sendMessage({ text: input }); setInput(''); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
    </div>
  );
}
```

## The `parts` model (this trips people up)

In v6, a message isn't just a string, it's a `parts` array. A part can be text,
a tool call, a reasoning block, a file, and more. For a plain chat you render the
`text` parts. When we get to **tools** (that's Day 3!), other part types show up
here too. Same data structure, richer content.

## Run it

```bash
cd next-chat
npm install
cp .env.example .env   # same AI Gateway key
npm run dev            # open http://localhost:3000
```

Type a message and watch it stream into the page token-by-token. That's the same
`streamText` from this morning, now with a UI.

The two files you'll work in:

| File | What it does |
|------|-------------|
| `next-chat/app/api/chat/route.ts` | server — calls `streamText`, returns the stream |
| `next-chat/app/page.tsx` | client — `useChat` hook, renders messages |

## Tips

> 💡 **Add a `system:` prompt to the route immediately**, even if it's rough. It's far
> easier to refine a system prompt that already exists than to retrofit one later.

> 💡 **`status` from `useChat` is free UX.** It gives you `'idle' | 'streaming' |
> 'submitted' | 'error'`. Show a loading indicator. Users need to know the app
> is working.

> 💡 **If you rename the route**, update the `api` option in `useChat`:
> `useChat({ api: '/api/your-route-name' })`. The default is `/api/chat`.

## Try it

1. **`next-chat/app/api/chat/route.ts`** — add `system: '…'` to the `streamText` call
   and give your bot a persona.
2. **`next-chat/app/api/chat/route.ts`** — swap `'anthropic/claude-sonnet-4.6'` for
   another model string. Feel the difference in tone and speed.
3. **`next-chat/app/page.tsx`** — use `useChat`'s `status` field to show an "AI is
   thinking…" indicator while the response streams in.

🔬 **Lab:** [Lab 02 · Streaming UI](../labs/02-streaming-ui.md) — put your project's
AI call in a browser with a streaming interface.

➡️ Next: [03 · Prompts, messages & responses](./03-prompts-and-responses.md)
