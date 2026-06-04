# Lab 05 · Add RAG

> ⏱️ ~30 min · After lesson 05

Give your feature a knowledge base. This lab is the most open-ended one because the right
approach depends entirely on what your data looks like.

---

## What you're doing

Add a retrieval step to your feature so the model can answer from a specific set of
content you provide — not from its training data.

---

## First: do you actually need RAG?

RAG is the right tool when:
- Your data is too large to include in every prompt
- You need the model to answer from *your specific content* (not general knowledge)
- You want the model to say "I don't know" when the content doesn't cover the question

If your feature doesn't query a knowledge base — if it's a classifier, a summarizer, or
a formatter — skip this lab and come back if you have time.

---

## Decide what your knowledge base is

Three questions:

1. **What content does the model need access to?** (docs, a FAQ, your notes, a product
   catalog, anything text-based)
2. **How is it structured?** (chunks of prose, individual Q&A pairs, records with fields)
3. **How does a user query it?** (open question, keyword, category filter?)

With those answers, tell your AI tools how to build it:

```
I need to add RAG to my feature.

Knowledge base:
[describe your content — what it is, how many docs/chunks, rough size]

Query pattern:
[what kind of question will the user ask? open-ended prose, keyword, etc.]

Use the pattern from src/08-rag.ts in the reference repo. I want:
- An in-memory vector store (I'll replace it with a real DB later if needed)
- Cosine similarity for retrieval
- Top-3 results injected into the prompt context
- The system prompt to instruct the model to answer ONLY from context

My knowledge base content:
[paste your actual content, or have Claude generate sample data matching your domain]
```

---

## Ground the model explicitly

This is the prompt pattern that makes RAG behave correctly:

```ts
system: 'Answer ONLY using the provided context. If the context does not contain the answer, say so clearly. Do not invent facts.',
prompt: `Context:\n${context}\n\nQuestion: ${question}`,
```

Without the grounding instruction, the model will blend your content with its training
data, which defeats the purpose.

---

## Test refusal

After it's working, ask something your knowledge base definitely doesn't cover. The model
should acknowledge the gap, not hallucinate an answer. If it hallucinates, tighten the
system prompt instruction.

---

## Tips

> 💡 **Shorter chunks retrieve better.** 200–400 tokens is a good default. If you paste
> in a 2,000-token document as one chunk, you'll retrieve it for almost any question —
> which means the context is always noisy.

> 💡 **Use the same embedding model for both indexing and querying.** Mixing models
> produces meaningless similarity scores. Both should use `EMBEDDING_MODEL` from
> `config.ts`.

> 💡 **Ask Claude to help design your chunking strategy** given your content format.
> A FAQ chunks differently than a technical doc. A recipe list chunks differently
> than a narrative essay.

> 💡 **Log which chunks were retrieved** during development. Seeing `[gateway] 0.87,
> [streaming] 0.73` tells you immediately whether retrieval is working as expected.

---

## Stretch

- Try different values of `TOP_K` (1, 3, 5). Notice how quality changes — higher K gives
  more context but also more noise.
- Add a "Sources" section to the response UI, listing which chunks contributed to the
  answer.
- Replace your static knowledge base with content fetched from a real URL or file at
  startup. Ask Claude to write a fetch-and-chunk function for your content format.

---

➡️ Next: [Lab 06 · Ship It](./06-ship-it.md) — after lesson 06
