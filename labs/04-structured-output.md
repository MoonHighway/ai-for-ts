# Lab 04 · Structured Output

> ⏱️ ~25 min · After lesson 04

This is the lab that turns your project from a demo into something you'd wire into a
real app. Replace free text output with a typed, validated Zod schema.

---

## What you're doing

Switch some or all of your feature's output from `generateText` → `generateObject` with a
Zod schema. If your feature produces anything your code needs to *use* (not just display),
it should come out typed.

---

## Design the schema first

Before you write TypeScript, describe your ideal output in plain English:

- What fields does a good response have?
- Which fields are free text? Which should be constrained to specific values?
- Which fields are arrays? Which are optional?
- What would be the type errors that could bite you later if left as `any` or a string?

Then ask your AI tools to turn that description into a Zod schema:

```
Here's my feature brief:
[paste BRIEF.md]

The output should have these fields:
[your plain-English description]

Write a Zod schema for this. For string fields that should only contain specific values,
use z.enum(). Add a .describe() to any field that might be ambiguous.
```

Review the schema before accepting it. This is the contract between the model and the
rest of your code — it's worth reading carefully.

---

## Swap the call

Replace `generateText` with `generateObject`:

```ts
import { generateObject } from 'ai';
import { z } from 'zod';
import { yourSchema } from './schema.js';

const { object } = await generateObject({
  model: MODEL,
  schema: yourSchema,
  prompt: yourPrompt,
});

// object is now fully typed as z.infer<typeof yourSchema>
```

Your existing system prompt still applies — you can keep it in `system:`.

---

## Handle validation failures explicitly

The SDK validates output against your schema and retries automatically. But when it
fails repeatedly, it throws. Wrap the call and handle it:

```ts
import { NoObjectGeneratedError } from 'ai';

try {
  const { object } = await generateObject({ ... });
  return object;
} catch (err) {
  if (NoObjectGeneratedError.isInstance(err)) {
    // Schema too strict? Prompt too vague? Log the partial output.
    console.error('Schema validation failed:', err.text);
  }
  throw err;
}
```

---

## Tips

> 💡 **Start flat.** A schema with one level of nesting is easier to debug than a deeply
> nested one. You can always add structure later once the model is reliably producing the
> right fields.

> 💡 **`.describe()` every non-obvious field.** It becomes part of the prompt. `z.string()
> .describe('ISO 8601 date, e.g. 2026-06-04')` reliably gets you the right format.

> 💡 **Ask your AI tools to add `.describe()` to your schema** — give it your schema and
> your brief and ask it to annotate every field with a precise description.

> 💡 **`z.enum()` over `z.string()` for anything categorical.** It kills typos, gives you
> autocomplete, and makes the model's choices explicit.

---

## Stretch

- If your feature currently streams text, consider whether `streamObject` makes sense.
  Use it when the object is large enough that showing partial results is worth the added
  complexity.
- Add the schema type to your function signature:
  `async function processInput(input: string): Promise<z.infer<typeof yourSchema>>`.
  TypeScript will now enforce the return type everywhere.
- Write a unit test that asserts your schema validates a known-good sample object. Free
  regression safety.

---

➡️ Next: [Lab 05 · RAG](./05-rag.md) — after lesson 05 (afternoon)
