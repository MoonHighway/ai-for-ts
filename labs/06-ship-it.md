# Lab 06 · Ship It

> ⏱️ ~25 min · After lesson 06

Your feature works. Now make it production-shaped. This lab is about closing the gap
between "runs on my machine" and "I could actually put this in front of users."

---

## What you're doing

Pick the production patterns from lesson 06 that matter most for your feature and add
them. You probably won't do all of them — that's fine. Pick the ones you'd be embarrassed
not to have before shipping.

---

## The short list

### 1. Abort signal + retries (do this one, it's three lines)

```ts
const { text } = await generateText({
  model: MODEL,
  prompt,
  maxRetries: 3,
  abortSignal: AbortSignal.timeout(20_000),
});
```

This handles transient provider errors and prevents infinite hangs. No reason not to have it.

### 2. A fallback model

Wrap your primary call in a try/catch and fall back to a cheaper/faster model on failure.
The fallback should do the same job, just less precisely:

```
Add a fallback to my [main function]. If the primary model call fails, retry with
'anthropic/claude-haiku-4.5'. The fallback should have the same prompt and schema,
just a different model string.
```

### 3. Response caching

If your feature can receive identical inputs (same doc, same question), caching will save
money and latency. The cache key is a hash of `model + prompt`:

```
Add response caching to my [main function] using the pattern from src/09-production.ts.
Use an in-memory Map for now. The cache key should hash the model name and the full prompt.
```

### 4. Usage logging

If you haven't already, add `usage` logging to every call. One line:

```ts
const { object, usage } = await generateObject({ ... });
console.log({ model: MODEL, ...usage });
```

In production, send this to a metrics system. For now, console is fine — you'll at least
see it.

---

## One more thing: error messages for users

Every AI call can fail. What does your UI show when it does? A raw stack trace is not
acceptable. Make sure every catch block produces a message a human can read.

```
Review my error handling. For every AI call, make sure:
1. The user sees a friendly message on failure, not a stack trace.
2. Errors are logged with enough context to debug (model, prompt length, error type).
3. The page/function doesn't leave the user in a broken state.
```

---

## Tips

> 💡 **`AbortSignal.timeout()` is a web standard** — it works in Node 20+, Deno, Bun,
> and edge runtimes. No polyfill needed.

> 💡 **The cheapest cost optimization is model selection.** Try `claude-haiku-4.5` for
> your feature. If the quality is acceptable, you've cut costs significantly.
> Haiku is fast and cheap; save Sonnet for tasks that need the extra capability.

> 💡 **Ask Claude to write a smoke test** for your feature's happy path. One test that
> checks the response shape is valid (schema validation) is enough to give you a
> regression check you can run in CI.

---

## Stretch: evals

Testing AI output is different from testing deterministic code. Try one of these:

- **Schema test**: assert that `generateObject` returns an object that passes your Zod
  schema for a fixed input. Fully deterministic.
- **Golden case**: save one good input → output pair. Re-run it periodically and flag if
  the output changes significantly. (Doesn't have to be exact-match — "does the summary
  mention the key topic?" is a fine check.)
- **LLM-as-judge**: ask a second model to rate your feature's output on a rubric.

```
Write a simple LLM-as-judge eval for my feature. Given an input and output, it should
return { score: 1-5, reason: string } using generateObject with a Zod schema.
```

---

## Last step: demo it

Show what you built to one other person in the room before you leave. Explain what it does
and what you'd add if you had another day.

That's the whole workshop. You built a real AI feature in TypeScript from scratch. 🌲
