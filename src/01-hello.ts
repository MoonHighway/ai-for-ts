// 👋 Your first AI SDK call.
// Run it:  npm run hello
//
// Notice: we pass the model as a STRING. The AI SDK sees `provider/model` and
// routes the request through the Vercel AI Gateway automatically. No provider
// package, no extra setup.

import { generateText } from 'ai';
import { MODEL } from './config.js';

const { text, usage } = await generateText({
  model: MODEL,
  prompt: 'Explain what the Vercel AI Gateway does in exactly two sentences.',
});

console.log('\n' + text + '\n');
console.log('tokens:', usage);
