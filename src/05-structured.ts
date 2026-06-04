// 🧱 Structured outputs: get typed data, not a string you have to parse.
// Run it:  npm run structured
//
// `generateObject` + a Zod schema = the model returns data that matches your
// types. The SDK validates it for you. This is the single most useful pattern
// for building real features, turn fuzzy text into something your code trusts.

import { generateObject } from 'ai';
import { z } from 'zod';
import { MODEL } from './config.js';

const recipeSchema = z.object({
  name: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  prepMinutes: z.number().int().positive(),
  ingredients: z.array(z.object({ item: z.string(), amount: z.string() })),
  steps: z.array(z.string()),
});

const { object } = await generateObject({
  model: MODEL,
  schema: recipeSchema,
  prompt: 'Give me a recipe for a quick weeknight pasta.',
});

// `object` is fully typed as z.infer<typeof recipeSchema>, autocomplete works!
console.log(`\n🍝 ${object.name} (${object.difficulty}, ${object.prepMinutes} min)\n`);
for (const { item, amount } of object.ingredients) {
  console.log(`  • ${amount} ${item}`);
}
console.log('\nSteps:');
object.steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));

// Bonus: classification with an enum is a one-liner.
const { object: sentiment } = await generateObject({
  model: MODEL,
  schema: z.object({ sentiment: z.enum(['positive', 'neutral', 'negative']) }),
  prompt: 'Classify: "This workshop is the highlight of my CascadiaJS!"',
});
console.log('\nSentiment:', sentiment.sentiment);
