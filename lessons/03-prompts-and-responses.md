# 03 · Prompts, messages & responses

> ⏱️ ~25 min · `npm run system`

The model only knows what you tell it. Getting good output is mostly about
*structuring the conversation* well.

## System prompt = the rules of the game

The `system` prompt sets behavior, tone, and constraints. It's the most powerful
lever you have. Same question, different system prompt, totally different answer:

```ts
generateText({ model: MODEL, system: 'You are a terse senior engineer. One sentence.', prompt: q });
generateText({ model: MODEL, system: 'You are an enthusiastic teacher with analogies.', prompt: q });
```

Run [`src/04-system-prompt.ts`](../src/04-system-prompt.ts) to see both. A good
system prompt usually covers: **role**, **tone**, **format**, and **boundaries**
("never invent prices", "reply in JSON only").

## Messages = the conversation (and your examples)

The `messages` array lets you provide prior turns *and* examples. Few-shot
prompting, showing a couple of input→output pairs, is the cheapest way to make
output more reliable:

```ts
messages: [
  { role: 'system', content: 'Reply ONLY with a JSON array of tags.' },
  { role: 'user', content: 'Tag: "Streaming chat with the AI SDK"' },
  { role: 'assistant', content: '["streaming","chat","ai-sdk"]' },  // ← the example
  { role: 'user', content: 'Tag: "Building RAG over a docs site"' },
]
```

The model pattern-matches your example. Way more reliable than describing the
format in prose.

## Reading the response

`generateText` gives you more than `text`:
- `text`: the answer
- `usage`: token counts (= your cost)
- `finishReason`: `'stop'`, `'length'`, `'tool-calls'`, …
- `response.messages`: what to append to history

> 🧠 Rule of thumb: **structure beats pleading.** A clear system prompt + one
> example will out-perform a paragraph of "please be careful to…".

## A note on prompt caching

Long, static system prompts can be *cached* by the provider so you don't pay to
re-process them every request. Through the Gateway you'll see cached-token pricing
in your usage. Keep the stable stuff (instructions, examples) at the top of your
prompt so it's cacheable. More on cost in [lesson 06](./06-production.md).

## Tips

> 💡 **"Be helpful and concise" is not a system prompt.** The model already tries to be
> helpful. Tell it *what form* helpful takes: the output format, the persona, the
> constraints specific to your use case.

> 💡 **One example beats a paragraph of prose.** If your output has a specific format,
> show the model a complete input → output pair rather than describing it.

> 💡 **`finishReason: 'length'` is a bug.** It means the response was cut off at the
> token limit. Increase `maxTokens` or tighten the prompt.

## Try it

1. Write a system prompt that makes the model always answer as a haiku.
2. Build a 2-example few-shot prompt for a tiny classifier of your choosing.
3. Log `finishReason` and `usage`, get used to looking at them.

🔬 **Lab:** [Lab 03 · Sharpen your prompts](../labs/03-prompts.md) — rewrite your
project's system prompt and add a few-shot example if the output format needs one.

➡️ Next: [04 · Structured outputs with Zod](./04-structured-outputs.md)
