// 🛟 Error handling & fallbacks.
// Run it:  npm run errors
//
// Real apps hit rate limits, timeouts, and the occasional bad day from a
// provider. Three habits: (1) set retries, (2) fall back to another model,
// (3) always have a graceful default for the user.

import { generateText, NoObjectGeneratedError } from 'ai';
import { MODEL } from './config.js';

// The SDK retries transient failures automatically. Tune it:
async function robustGenerate(prompt: string) {
  try {
    const { text } = await generateText({
      model: MODEL,
      prompt,
      maxRetries: 3, // exponential backoff on transient errors
      abortSignal: AbortSignal.timeout(20_000), // don't hang forever
    });
    return text;
  } catch (primaryError) {
    console.warn('Primary model failed, falling back to haiku…', String(primaryError));
    // Fallback: a different (cheaper/faster) model through the same Gateway.
    const { text } = await generateText({
      model: 'anthropic/claude-haiku-4.5',
      prompt,
      maxRetries: 2,
    });
    return text;
  }
}

const answer = await robustGenerate('Give me one tip for handling AI API errors.');
console.log('\n' + answer + '\n');

// Type-safe error checks exist for specific failure modes, e.g. structured
// output that didn't validate:
function explainError(err: unknown) {
  if (NoObjectGeneratedError.isInstance(err)) {
    return 'The model returned something that did not match our schema.';
  }
  return 'Unknown error, log it, alert, and show the user a friendly message.';
}
console.log('Error helper ready:', explainError(new Error('demo')));
