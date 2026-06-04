// 🏭 Production patterns: caching, rate limiting, and cost awareness.
// Run it:  npm run production
//
// These are small, dependency-free versions of the three things that bite you
// in production. In a real app you'd back the cache with Redis and the limiter
// with your edge runtime, but the shapes are the same.

import { generateText } from 'ai';
import { createHash } from 'node:crypto';
import { MODEL } from './config.js';

// 1) CACHING, never pay twice for the same answer.
const cache = new Map<string, string>();
const keyFor = (model: string, prompt: string) =>
  createHash('sha256').update(`${model}::${prompt}`).digest('hex');

async function cachedGenerate(prompt: string) {
  const key = keyFor(MODEL, prompt);
  if (cache.has(key)) {
    console.log('  ⚡ cache hit');
    return cache.get(key)!;
  }
  const { text } = await generateText({ model: MODEL, prompt });
  cache.set(key, text);
  console.log('  💸 cache miss (called the model)');
  return text;
}

// 2) RATE LIMITING, a tiny token-bucket so one user can't melt your bill.
class RateLimiter {
  private tokens: number;
  constructor(private max: number, private refillPerSec: number) {
    this.tokens = max;
    setInterval(() => {
      this.tokens = Math.min(this.max, this.tokens + this.refillPerSec);
    }, 1000).unref();
  }
  allow() {
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}

// 3) COST AWARENESS, log token usage so cost is never a surprise.
async function trackedGenerate(prompt: string) {
  const { text, usage } = await generateText({ model: MODEL, prompt });
  console.log(`  📊 usage: ${JSON.stringify(usage)}`);
  return text;
}

// --- Demo ---
const limiter = new RateLimiter(2, 1);
console.log('\nRate limiter (max 2):');
for (let i = 1; i <= 3; i++) console.log(`  request ${i}: ${limiter.allow() ? '✅ allowed' : '⛔ throttled'}`);

console.log('\nCaching (same prompt twice):');
await cachedGenerate('Say hi in 3 words.');
await cachedGenerate('Say hi in 3 words.');

console.log('\nCost tracking:');
await trackedGenerate('Name one PNW tree.');
console.log('\n✅ Production patterns demo complete.\n');
