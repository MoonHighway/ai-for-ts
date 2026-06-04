// 🎭 System prompts & message shape.
// Run it:  npm run system
//
// The `system` prompt sets the rules of the game. `messages` is the conversation.
// Same user question, two different system prompts → two very different answers.

import { generateText } from 'ai';
import { MODEL } from './config.js';

const question = 'How do I center a div?';

async function ask(system: string, label: string) {
  const { text } = await generateText({ model: MODEL, system, prompt: question });
  console.log(`\n${label}\n${text}`);
}

await ask(
  'You are a terse senior engineer. One sentence, no fluff.',
  'Terse senior',
);

await ask(
  'You are an enthusiastic teacher who explains with a tiny analogy and a code snippet.',
  'Enthusiastic teacher',
);

// Message arrays let you provide examples (few-shot) or prior turns:
const { text } = await generateText({
  model: MODEL,
  messages: [
    { role: 'system', content: 'Reply ONLY with a JSON array of tags. No prose.' },
    { role: 'user', content: 'Tag this: "Streaming chat with the Vercel AI SDK"' },
    { role: 'assistant', content: '["streaming","chat","vercel-ai-sdk"]' },
    { role: 'user', content: 'Tag this: "Building RAG over a docs site"' },
  ],
});
console.log('\nFew-shot tagging\n' + text);
