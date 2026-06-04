# 05 · Retrieval Augmented Generation (RAG)

> ⏱️ ~45 min · `npm run embeddings` · `npm run rag "your question"`

Models don't know about *your* data, your docs, your product, your wiki. RAG
fixes that: retrieve the relevant bits of your content and hand them to the model
so it answers from your sources instead of guessing.

## The whole idea in one breath

> Find the chunks of my data most relevant to the question, paste them into the
> prompt, and ask the model to answer using only those.

## Step 1, embeddings (meaning as math)

An **embedding** turns text into a vector. Similar meanings → vectors pointing the
same direction → high **cosine similarity**.

```ts
import { embed, embedMany, cosineSimilarity } from 'ai';

const { embeddings } = await embedMany({ model: EMBEDDING_MODEL, values: docs });
const { embedding: q } = await embed({ model: EMBEDDING_MODEL, value: question });
const score = cosineSimilarity(q, embeddings[0]); // 1 = identical meaning, 0 = unrelated
```

Run [`src/07-embeddings.ts`](../src/07-embeddings.ts), you'll watch AI/chat
phrases rank above beach/rain phrases for an AI question. That ranking *is*
retrieval.

## Step 2, chunking

You don't embed whole documents, you embed **chunks**. Why? Precision (retrieve
the relevant paragraph, not the whole manual) and context limits.

Rules of thumb:
- A few hundred tokens per chunk is a sane default.
- **Overlap** chunks a little so ideas spanning a boundary aren't lost.
- Chunk on natural seams (headings, paragraphs) when you can.

## Step 3, retrieve + generate

```
embed docs (once)  →  embed query  →  score & take top-K  →  put in prompt  →  generate
```

[`src/08-rag.ts`](../src/08-rag.ts) is a complete tiny RAG system with an
in-memory vector store:

```bash
npm run rag "how does the gateway work?"
npm run rag "what is CascadiaJS karaoke about?"
```

Notice two things:
1. It cites which chunks it retrieved (the `[id]` lines).
2. The system prompt says *"answer ONLY from the context"*, so when you ask
   something the docs don't cover, it says so instead of hallucinating. That
   grounding is the point.

## From toy to production

| Toy (today) | Production |
|-------------|------------|
| in-memory array + `cosineSimilarity` | a vector database (pgvector, Pinecone, etc.) |
| embed on every run | embed once, store, re-use |
| naive top-K | hybrid search (keyword + vector), re-ranking |
| static docs | a pipeline that re-embeds on content change |

The *shape* is identical, you're just swapping the array for a real store.

## Tips

> 💡 **Shorter chunks retrieve better.** 200–400 tokens per chunk is a solid default.
> One giant chunk gets retrieved for almost any query — the context is always noisy.

> 💡 **Index and query must use the same embedding model.** Different models have
> different vector spaces — mixing them produces meaningless similarity scores.

> 💡 **Ground the model explicitly.** `'Answer ONLY from the provided context. If
> the context doesn't contain the answer, say so.'` Without that instruction, the
> model blends your content with training data, which defeats the point.

> 💡 **Log retrieved chunk IDs** during development. Seeing which chunks were pulled
> tells you immediately whether retrieval is working or not.

## 🛠️ Hands-on, build a knowledge-base chatbot

1. Replace the contents of [`src/knowledge.ts`](../src/knowledge.ts) with your own
   facts (your README, your project notes, anything).
2. Run `npm run rag "..."` against your data.
3. Ask something *not* in your data and confirm it declines gracefully.
4. Stretch: lower/raise `TOP_K` in `08-rag.ts` and feel the precision/recall trade.

🔬 **Lab:** [Lab 05 · RAG](../labs/05-rag.md) — add a knowledge base to your project
so the model can answer from your own data.

➡️ Next: [06 · Production AI features](./06-production.md)
