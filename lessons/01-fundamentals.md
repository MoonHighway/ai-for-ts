# 01 · Fundamentals: generate & stream

> ⏱️ ~30 min · `npm run hello` · `npm run stream` · `npm run chat`

The AI SDK gives you a handful of core functions. Learn these four and you can
build almost anything.

| Function | Returns | Use for |
|----------|---------|---------|
| `generateText` | the full text at once | short answers, batch jobs |
| `streamText` | a stream of chunks | anything a user watches happen |
| `generateObject` | typed, validated data | structured features (lesson 04) |
| `embed` / `embedMany` | vectors | search & RAG (lesson 05) |

## generateText, the one-shot

Open **[`src/01-hello.ts`](../src/01-hello.ts)** and run it:

```bash
npm run hello
```

The key lines:

```ts
const { text, usage } = await generateText({
  model: MODEL,
  prompt: 'Explain what the Vercel AI Gateway does in exactly two sentences.',
});
console.log(text);
console.log('tokens:', usage);
```

`usage` is your bill — `promptTokens + completionTokens = totalTokens`. Get in the
habit of watching it.

## streamText, don't make users wait

Open **[`src/02-stream.ts`](../src/02-stream.ts)** and run it:

```bash
npm run stream
```

The key difference from `generateText`:

```ts
const result = streamText({ model: MODEL, prompt: '…' });
for await (const chunk of result.textStream) {
  process.stdout.write(chunk); // prints each token as it arrives
}
```

`streamText` returns *immediately* — tokens arrive as the model generates them.
Change the prompt in `src/02-stream.ts` and rerun. Notice the output appearing
word by word rather than all at once.

## Conversations are just arrays

Open **[`src/03-chat.ts`](../src/03-chat.ts)** and run it:

```bash
npm run chat
```

A conversation is a `messages` array you keep appending to. Find these two lines
in the file — they're what gives the model memory:

```ts
messages.push({ role: 'user', content: userInput });
// ... stream the reply ...
messages.push({ role: 'assistant', content: full });
```

Ask a follow-up question that requires the first answer. It works because you
sent the whole history again.

## Tips

> 💡 **When in doubt, use `streamText`.** Retrofitting streaming into a UI that
> expected a full response is painful. Going the other direction is easy.

> 💡 **There's no session state.** You send the full message history with every
> request. The model has "memory" because you gave it the transcript — not because
> it remembered you.

> 💡 **Ask your AI tools to adapt the reference scripts, not start from scratch.**
> "Adapt `src/02-stream.ts` for my use case — I want to stream [X] instead of a haiku."

## Try it

1. In **`src/02-stream.ts`**, change the prompt to anything you like. Run
   `npm run stream` and watch your text stream in.
2. In **`src/config.ts`**, change `MODEL` to `'openai/gpt-5.5'`. Run
   `npm run hello`. Same code, different provider.
3. Run `npm run chat`. Ask something, then ask a follow-up that only makes sense
   given the first answer — confirm the model remembers the thread.

🔬 **Lab:** [Lab 01 · First AI call](../labs/01-first-call.md) — add `generateText`
or `streamText` to your project from lab 00.

➡️ Next: [02 · Streaming chat UI](./02-streaming-ui.md)
