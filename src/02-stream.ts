// 🌊 Streaming: don't make users wait for the whole answer.
// Run it:  npm run stream
//
// `streamText` returns immediately with a `textStream` async iterable. We print
// chunks as they arrive, the same data your UI would render token-by-token.

import { streamText } from 'ai';
import { MODEL } from './config.js';

const result = streamText({
  model: MODEL,
  prompt: 'Write a short, upbeat haiku about shipping AI features in TypeScript.',
});

process.stdout.write('\n');
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
process.stdout.write('\n\n');

// You can still await the aggregates after streaming:
console.log('total tokens:', await result.usage);
