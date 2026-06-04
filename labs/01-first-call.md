# Lab 01 · First AI Call

> ⏱️ ~20 min · After lesson 01

Wire `generateText` or `streamText` into your project for the first time. This is the
"does it work?" moment. Keep it minimal — you'll refine the prompt in lab 03.

---

## What you're doing

Add one real AI call to your project's main function. The output doesn't have to be
polished yet. It just has to run, return something, and log `usage`.

---

## Choose your function

**Use `streamText`** if:
- A user will watch the response arrive (any UI, any terminal chat)
- The response might take more than a second or two

**Use `generateText`** if:
- The output feeds another step in code (not directly to a user)
- Speed doesn't matter and you want the full result at once

When in doubt, use `streamText`. It's easier to switch to `generateText` later than
to retrofit streaming into a UI.

---

## Build it

Tell your AI tools what you need:

```
I'm adding a generateText (or streamText) call to my project.

Here's my brief:
[paste BRIEF.md]

The function should:
- Accept [your input type] as a parameter
- Call generateText/streamText with a basic prompt
- Return (or stream) the result
- Log usage.totalTokens after the call

Use the MODEL from config.ts and the pattern from src/01-hello.ts or src/02-stream.ts
in the reference repo.
```

Run it. See what comes back.

---

## Evaluate honestly

Does the output match your "success looks like" from the brief? It probably doesn't —
that's normal and fine. Notice specifically:
- What's right?
- What's wrong or missing?
- Is the model doing the right *kind* of thing, just imprecisely?

Write down 2–3 things you want to fix. You'll address them in lab 03 (prompts).

---

## Tips

> 💡 **Always log `usage`** on every call during development. It's a one-liner and it
> keeps cost visible. Surprises happen when you stop looking.

> 💡 **The first prompt is a placeholder.** Don't spend more than a minute on it now.
> You'll have a whole lesson on prompt engineering before lab 03.

> 💡 **Ask your AI tool to add error handling too.** It's easy to forget and you'll hit
> rate limits or timeouts during the workshop.

---

## Stretch

- Add a second call that approaches the same task differently (different prompt, different
  model). Compare the outputs.
- Wrap the call in a function with a typed signature. That typed interface will matter a
  lot in lab 04.

---

➡️ Next: [Lab 02 · Streaming UI](./02-streaming-ui.md) — after lesson 02
