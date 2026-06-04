// 🧲 Embeddings: turn text into vectors, then measure meaning by distance.
// Run it:  npm run embeddings
//
// This is the engine under RAG and semantic search. Similar meanings → vectors
// that point the same way → high cosine similarity.

import { embed, embedMany, cosineSimilarity } from 'ai';
import { EMBEDDING_MODEL } from './config.js';

const phrases = [
  'a sunny day at the beach',
  'a rainy afternoon indoors',
  'streaming chat with the Vercel AI SDK',
  'building a realtime AI chatbot in TypeScript',
];

// Embed many at once (cheaper + faster than one-by-one).
const { embeddings } = await embedMany({ model: EMBEDDING_MODEL, values: phrases });

// Compare a query to each phrase.
const { embedding: query } = await embed({
  model: EMBEDDING_MODEL,
  value: 'how do I build an AI chat app?',
});

console.log('\nQuery: "how do I build an AI chat app?"\n');
const ranked = phrases
  .map((text, i) => ({ text, score: cosineSimilarity(query, embeddings[i]) }))
  .sort((a, b) => b.score - a.score);

for (const { text, score } of ranked) {
  console.log(`  ${score.toFixed(3)}  ${text}`);
}
console.log('\nNotice the two AI/chat phrases float to the top. That ranking IS retrieval.');
