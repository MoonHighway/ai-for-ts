# 06 · Production AI features

> ⏱️ ~40 min · `npm run errors` · `npm run production`

A demo that works once on your laptop is not a feature. Here's what stands between
"cool" and "shipped."

## 1. Errors & fallbacks

Providers rate-limit, time out, and occasionally have a bad day. Three habits:

```ts
const { text } = await generateText({
  model: MODEL,
  prompt,
  maxRetries: 3,                              // auto backoff on transient errors
  abortSignal: AbortSignal.timeout(20_000),   // never hang forever
});
```

And a **fallback model** through the same Gateway when the primary fails:

```ts
catch {
  return generateText({ model: 'anthropic/claude-haiku-4.5', prompt });
}
```

See [`src/06-errors.ts`](../src/06-errors.ts). Always have a graceful user-facing
message: never show a raw stack trace to a human.

## 2. Caching, stop paying twice

The same prompt should never cost you twice. Cache on a hash of `model + prompt`:

```ts
const key = sha256(`${model}::${prompt}`);
if (cache.has(key)) return cache.get(key);   // ⚡ free + instant
```

[`src/09-production.ts`](../src/09-production.ts) shows an in-memory version; in
prod back it with Redis. Two layers worth knowing:
- **Your response cache** (above): identical request → stored answer.
- **Provider prompt caching**: reuse the static prefix of long prompts. Keep
  system prompts/examples stable and at the top to benefit.

## 3. Rate limiting: protect your bill

One enthusiastic user (or a loop bug) shouldn't melt your budget. A token-bucket
limiter per user/IP is the standard move (see the demo's `RateLimiter`). At the
edge, use your platform's limiter; the concept is the same.

## 4. Cost awareness

Every call returns `usage` (input/output tokens). Log it. Watch it. Set alerts.

```ts
const { text, usage } = await generateText({ model: MODEL, prompt });
metrics.record({ model: MODEL, ...usage });
```

Cheap levers: pick the **smallest model that's good enough** (haiku for routing,
sonnet for the real work), cache aggressively, and keep prompts tight.

## 5. Testing & monitoring (a.k.a. evals)

AI output is non-deterministic, so you test *differently*:
- **Schema tests**: for `generateObject`, assert the shape/validation (fully
  deterministic: easy win).
- **Golden cases**: a set of inputs with known-good expectations; flag regressions.
- **LLM-as-judge**: for fuzzy quality, have a model grade outputs against a rubric.
- **Trace everything**: log prompts, responses, latency, tokens. The Gateway
  dashboard gives you a head start.

> 🧪 Reframe: you're not testing "is this string exactly right," you're testing
> "is this *good enough, reliably*." Evals are how you ship AI with confidence.

## Tips

> 💡 **`AbortSignal.timeout()` is Web-standard.** It works in Node 20+, Deno, Bun,
> and edge runtimes with no polyfill. Use it on every AI call.

> 💡 **Try `claude-haiku-4.5` before assuming you need Sonnet.** For classification,
> routing, and extraction tasks, haiku is often good enough — at a fraction of the
> cost. Benchmark it against your actual use case.

> 💡 **Ask Claude to write an LLM-as-judge eval for your feature.** Give it your
> system prompt and ask it to produce a grading rubric and a `generateObject` call
> that scores output 1–5 with a reason. Free quality feedback, rerunnable in CI.

## 🛠️ Hands-on, add AI search to an app

Take the RAG pipeline from lesson 05 and make it production-shaped:
1. Wrap retrieval+generation in a `cachedGenerate`.
2. Add a fallback model.
3. Log `usage` for every call.
4. Write one schema test and one golden-case test.

🔬 **Lab:** [Lab 06 · Ship it](../labs/06-ship-it.md) — harden your project with
retries, a fallback model, caching, and usage logging.

## 🎉 That's a wrap on Day 2!

You can now: call & stream models through the Gateway, build a streaming chat UI,
get typed data with Zod, build RAG over your own data, and ship it with caching,
fallbacks, and cost awareness.

Tomorrow (Day 3): we give the model **tools** and let it act, agents! 💚🌲
