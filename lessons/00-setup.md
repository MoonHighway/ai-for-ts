# 00 · Setup & the SDK in 5 minutes

> ⏱️ ~30 min together at the top of the day.

## The big idea

The **Vercel AI SDK** is a TypeScript toolkit for talking to AI models. The
**AI Gateway** is the thing it talks *through*: one key, one endpoint, every
provider.

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-4.6', // ← provider/model string
  prompt: 'Hello!',
});
```

That `model` string is the magic. The SDK sees `provider/model` and routes through
the Gateway automatically. Swap `anthropic/claude-sonnet-4.6` for `openai/gpt-5.5`
and you've changed providers, same code, same key.

## Get set up

```bash
npm install
cp .env.example .env        # paste your AI Gateway key
npm run hello               # smoke test
```

Grab your key at [vercel.com/dashboard](https://vercel.com/dashboard) → AI Gateway
→ API Keys. It looks like `vck_…`.

## Why the Gateway (and not five provider SDKs)?

- **One key** for the whole room: no five-account scavenger hunt.
- **Swap models with a string**: compare Claude vs GPT vs Gemini in seconds.
- **Built-in observability, fallbacks, and cost tracking** in the dashboard.
- Your code never imports a provider package. It just changes a string.

## Today's shape

- **Morning:** the core moves, generate, stream, chat, prompt, and get *typed*
  data out of a model.
- **Afternoon:** the patterns that make it real, RAG over your own data, plus
  production concerns (errors, caching, rate limits, cost).

Everything is a runnable script. When in doubt, run it and poke at it. 🛠️

## Tips

> 💡 **`src/config.ts` is the one file that controls everything.** Change `MODEL` there
> and every script re-routes. Swap between Claude, GPT, and Gemini by editing a string.

> 💡 **Bookmark the Gateway dashboard.** The Logs tab shows every call in real time —
> great for confirming your key is working and watching token counts during the workshop.

> 💡 **`usage` is your bill.** Every `generateText` and `streamText` call returns a
> `usage` object. Get in the habit of logging it from your very first call.

🔬 **Lab:** [Lab 00 · Pick your project](../labs/00-pick-your-project.md) — while
others finish setup, pick the project you'll build on incrementally all day.

➡️ Next: [01 · Fundamentals](./01-fundamentals.md)
