// 📚 RAG: answer questions from YOUR data.
// Run it:  npm run rag  "how does the gateway work?"
//
// Pipeline: embed your docs once → embed the question → retrieve the closest
// chunks → stuff them into the prompt → generate a grounded answer. This is a
// full (tiny) RAG system in ~40 lines with an in-memory vector store.

import { embed, embedMany, cosineSimilarity, generateText } from 'ai';
import { MODEL, EMBEDDING_MODEL } from './config.js';
import { DOCS } from './knowledge.js';

const question = process.argv[2] ?? 'How does the Vercel AI Gateway work?';

// 1. Index: embed every doc chunk once. (In prod this lives in a vector DB.)
const { embeddings } = await embedMany({
  model: EMBEDDING_MODEL,
  values: DOCS.map((d) => d.text),
});
const store = DOCS.map((doc, i) => ({ ...doc, vector: embeddings[i] }));

// 2. Retrieve: embed the question, score every chunk, keep the top matches.
const { embedding: queryVector } = await embed({ model: EMBEDDING_MODEL, value: question });
const TOP_K = 3;
const retrieved = store
  .map((doc) => ({ ...doc, score: cosineSimilarity(queryVector, doc.vector) }))
  .sort((a, b) => b.score - a.score)
  .slice(0, TOP_K);

console.log(`\n🔎 Retrieved for: "${question}"`);
for (const r of retrieved) console.log(`   ${r.score.toFixed(3)}  [${r.id}]`);

// 3. Generate: ground the answer in the retrieved context only.
const context = retrieved.map((r) => `- ${r.text}`).join('\n');
const { text } = await generateText({
  model: MODEL,
  system:
    'Answer ONLY using the provided context. If the context does not contain the answer, say so. Be concise.',
  prompt: `Context:\n${context}\n\nQuestion: ${question}`,
});

console.log('\n💡 Answer:\n' + text + '\n');
