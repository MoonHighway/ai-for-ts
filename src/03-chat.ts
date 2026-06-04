// 💬 A multi-turn chat, in your terminal.
// Run it:  npm run chat   (type 'exit' to quit)
//
// The key idea: a conversation is just an array of messages you keep appending
// to. We stream each assistant reply, then push it back into history so the
// model remembers the thread.

import { streamText, type ModelMessage } from 'ai';
import { MODEL } from './config.js';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const messages: ModelMessage[] = [
  { role: 'system', content: 'You are a friendly, concise pair programmer. Keep answers short.' },
];

console.log('\n💬 Chat away! (type "exit" to quit)\n');

while (true) {
  const userInput = await rl.question('you › ');
  if (userInput.trim().toLowerCase() === 'exit') break;

  messages.push({ role: 'user', content: userInput });

  const result = streamText({ model: MODEL, messages });

  process.stdout.write('ai  › ');
  let full = '';
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
    full += chunk;
  }
  process.stdout.write('\n\n');

  // Remember the reply so the next turn has context.
  messages.push({ role: 'assistant', content: full });
}

rl.close();
console.log('👋 bye!');
