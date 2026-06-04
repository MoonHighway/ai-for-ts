# Lab 03 · Sharpen Your Prompts

> ⏱️ ~20 min · After lesson 03

Your first AI call from lab 01 probably has a placeholder prompt. Now fix it. Good prompts
are the difference between "kind of works" and "I'd actually show this to someone."

---

## What you're doing

Rewrite the system prompt and user-facing prompt in your feature. Add a few-shot example
if the output format is something the model needs to learn by seeing it.

---

## Start with the system prompt

Your system prompt should answer four questions:

1. **Role** — what expert or persona is answering?
2. **Tone** — how should it communicate?
3. **Format** — what does the output look like? (prose, JSON, a specific structure, markdown)
4. **Boundaries** — what should it never do? What should it always do?

Draft one. Then ask your AI tools to critique it:

```
Here's the system prompt for my feature:

[your system prompt]

Critique it against these criteria:
- Role: is the persona clear?
- Tone: is the register appropriate for [your use case]?
- Format: does it specify the output format precisely?
- Boundaries: what edge cases might it mishandle?

Suggest a revised version.
```

---

## Add a few-shot example if format matters

If your output has a specific structure — a list, a JSON shape, a specific ordering —
show the model an example instead of describing the format in prose:

```ts
messages: [
  { role: 'system', content: 'Your system prompt here.' },
  { role: 'user', content: '[an example input]' },
  { role: 'assistant', content: '[the exact output you want]' },
  { role: 'user', content: '[your actual user input goes last]' },
]
```

One good example beats a paragraph of instructions.

---

## Evaluate with your own inputs

Test with at least three different inputs:
- The obvious happy path
- A messy or edge-case input
- Something that should produce a short, crisp response

For each, write down: is this what you expected? If not, what's wrong? Then iterate.

---

## Tips

> 💡 **Put stable instructions at the top of your system prompt.** The provider can
> cache the prefix of long prompts across requests. Changing things at the end is fine;
> changing things at the top busts the cache.

> 💡 **"Be helpful and concise" is not a system prompt.** The model already tries to be
> helpful. Tell it *what form* helpful takes for your specific use case.

> 💡 **Ask Claude to generate test cases for your prompt** — give it your system prompt
> and brief and ask for 5 inputs that would stress-test the format and boundary cases.

---

## Stretch

- Write two different system prompts for the same task and A/B test them with the same
  inputs. Log both outputs. Pick the winner.
- Add `finishReason` logging. If you ever see `'length'`, your response is being cut off —
  increase `maxTokens` or tighten your prompt.
- Try the same prompt on two different models. Note differences in tone, format, and token
  cost.

---

➡️ Next: [Lab 04 · Structured Output](./04-structured-output.md) — after lesson 04
