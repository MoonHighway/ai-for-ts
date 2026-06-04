# 04 · Structured outputs with Zod

> ⏱️ ~30 min · `npm run structured`

This is the lesson that turns "cute demo" into "real feature." Instead of getting
a *string* you have to parse and pray over, you get **typed, validated data**.

## `generateObject` + Zod

```ts
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: MODEL,
  schema: z.object({
    sentiment: z.enum(['positive', 'neutral', 'negative']),
    confidence: z.number().min(0).max(1),
  }),
  prompt: 'Classify: "This workshop is the highlight of my CascadiaJS!"',
});

object.sentiment; // ← typed as 'positive' | 'neutral' | 'negative'
```

What you get:
- The model returns data matching your schema.
- The SDK **validates** it against Zod. Bad data throws, you don't ship garbage.
- `object` is fully typed via `z.infer`. Autocomplete everywhere. 🎉

See [`src/05-structured.ts`](../src/05-structured.ts) for a recipe extractor and a
one-line classifier.

## Why this is the workhorse pattern

Almost every "AI feature" is really *structured extraction*:
- Pull `{ name, email, company }` out of a contact form blurb.
- Turn a support ticket into `{ category, priority, summary }`.
- Convert a recipe page into structured ingredients & steps.
- Classify, tag, score, route.

Describe the shape with Zod, and the model fills it in, reliably, because the
schema constrains it.

## Schema tips that save you pain

- **`.describe()` each field**: the description is part of the prompt. `z.string().describe('ISO 8601 date')` works wonders.
- **Prefer `enum` over free strings** for categories: kills typos and drift.
- **Keep it as flat as you reasonably can**: deeply nested schemas are harder for models (and humans).
- **Validation is your friend**: if it throws, your prompt or schema needs work, *before* it reaches a user.

## Bonus: streaming objects

`streamObject` streams a *partial* object as it's built, great for showing a form
filling itself in live. Same idea as `streamText`, but typed. Reach for it when a
structured result is big enough that waiting feels slow.

## Tips

> 💡 **Ask your AI tools to generate the Zod schema for you.** Describe what fields
> you need in plain English and ask Claude to write the schema. Review it before using
> it — the schema is a contract between the model and your code.

> 💡 **Start flat.** Deeply nested schemas are harder for models (and humans) to
> reason about. Add nesting only after the flat version is reliably producing
> the right fields.

> 💡 **`z.enum()` over `z.string()` for anything categorical.** It constrains the
> model's output, gives you TypeScript autocomplete, and kills formatting drift.

## Try it

1. Write a schema that extracts `{ title, attendees: string[], date }` from a
   sentence like *"Sync with Eve and Alex next Tuesday about the workshop."*
2. Add `.describe()` to a field and watch the output get more precise.
3. Feed it deliberately messy input and see validation do its job.

🔬 **Lab:** [Lab 04 · Structured output](../labs/04-structured-output.md) — swap
your project's text output for a typed Zod schema.

➡️ Next (afternoon!): [05 · RAG](./05-rag.md)
