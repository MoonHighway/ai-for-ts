import { streamText, convertToModelMessages, type UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds.
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    // Swap this string to change models, routes through the AI Gateway.
    model: 'anthropic/claude-sonnet-4.6',
    system: 'You are a friendly, concise assistant for a CascadiaJS workshop.',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
