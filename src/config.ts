import 'dotenv/config';

// One place to pick the default model. Swap the string and everything below
// routes to a different provider through the Vercel AI Gateway. That's the
// whole magic, no provider SDKs, no per-provider keys. ✨
export const MODEL = 'anthropic/claude-sonnet-4.6';

// Some other models you can drop in (try it!):
//   'anthropic/claude-opus-4.7'      , heavier reasoning
//   'anthropic/claude-haiku-4.5'     , fastest + cheapest
//   'openai/gpt-5.5'                 , different vibe
//   'google/gemini-3.1-pro-preview'  , huge context window

export const EMBEDDING_MODEL = 'openai/text-embedding-3-small';

if (!process.env.AI_GATEWAY_API_KEY) {
  console.error(
    '\n⚠️  No AI_GATEWAY_API_KEY found. Copy .env.example to .env and add your key.\n' +
      '   Get one at https://vercel.com/dashboard → AI Gateway → API Keys\n',
  );
  process.exit(1);
}
