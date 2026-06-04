# Lab 02 · Streaming UI

> ⏱️ ~25 min · After lesson 02

Put your AI call in a browser. Watching tokens stream into a real UI is a different
experience than printing to a terminal — and it's closer to what you'd actually ship.

---

## What you're doing

Build a minimal Next.js page that takes user input and streams your feature's output.
This doesn't need to be beautiful. It needs to work.

---

## Decide on the shape

Before you start building, answer these:

1. **What does the user type or paste?** (free text box, structured form fields, a URL?)
2. **What do they see come back?** (streaming prose, a filling-in form, a list?)
3. **Is there any state the UI needs to hold** beyond the current conversation? (history,
   a selected document, a mode toggle?)

Write the answers down. Then ask your AI tools to build it.

---

## Build it

Use `next-chat/` as a reference or as a base you copy and modify. Tell Claude:

```
I'm building a streaming UI for my project.

Here's my brief:
[paste BRIEF.md]

The UI needs:
- [describe the input: text area, form, etc.]
- A POST /api/[feature] route that calls streamText and returns toUIMessageStreamResponse()
- A client page using the useChat hook (or a custom hook if useChat doesn't fit)
- The response streamed into the page token by token

Use next-chat/ from the reference repo as the pattern.
```

The route and the page are the two files you need. Everything else is optional.

---

## The thing that always trips people up

`useChat` expects a **`/api/chat` route** that speaks its streaming protocol.
If you rename the route, update the `api` option in `useChat`:

```tsx
const { messages, sendMessage } = useChat({ api: '/api/your-route-name' });
```

Also: the `messages` array uses `parts`, not a plain string. To render text:

```tsx
{m.parts.map((part, i) =>
  part.type === 'text' ? <span key={i}>{part.text}</span> : null
)}
```

---

## Tips

> 💡 **Add a system prompt to the route immediately**, even if it's rough. It's much
> easier to refine a system prompt that exists than to add one to a running app later.

> 💡 **`status` from `useChat`** gives you `'idle' | 'streaming' | 'submitted' | 'error'`
> for free. Show a loading indicator. Users need to know the app is working.

> 💡 **Ask Cursor or Claude to wire up the `status` state** — it's a one-line addition
> but easy to forget and bad UX when missing.

---

## Stretch

- Add a toggle to switch between two models (`config.ts` has the options). Let the user
  see the speed and style difference.
- Show a "tokens used" counter in the UI using `useChat`'s `onFinish` callback.
- If your feature doesn't fit a chat shape, consider building a form → result page instead
  of `useChat`. Ask Claude to scaffold that pattern.

---

➡️ Next: [Lab 03 · Prompts](./03-prompts.md) — after lesson 03
