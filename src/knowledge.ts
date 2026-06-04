// A tiny "knowledge base" for the RAG demo. In a real app these would come from
// your docs, a database, a CMS, anywhere. We keep it inline so the demo runs
// with zero external setup.

export const DOCS: { id: string; text: string }[] = [
  {
    id: 'gateway',
    text: 'The Vercel AI Gateway gives you one API key and one endpoint to reach many model providers. You select a model with a string like "anthropic/claude-sonnet-4.6" and the Gateway routes the request. This lets you swap models without changing provider SDKs.',
  },
  {
    id: 'streaming',
    text: 'Streaming sends tokens to the client as they are generated instead of waiting for the full response. In the AI SDK, streamText returns a textStream you can iterate, and toUIMessageStreamResponse() turns it into a streamed HTTP response for the useChat hook.',
  },
  {
    id: 'structured',
    text: 'Structured outputs use generateObject with a Zod schema so the model returns typed, validated data instead of free text. This is ideal for classification, extraction, and any feature where your code needs reliable fields.',
  },
  {
    id: 'embeddings',
    text: 'Embeddings turn text into vectors of numbers. Similar meanings produce nearby vectors. You create them with embed or embedMany, then compare with cosineSimilarity to find the most relevant chunks for a query.',
  },
  {
    id: 'rag',
    text: 'Retrieval Augmented Generation (RAG) retrieves relevant chunks from your own data and includes them in the prompt so the model answers from your sources. The steps are: chunk your content, embed the chunks, embed the query, retrieve the closest chunks, then generate an answer grounded in them.',
  },
  {
    id: 'caching',
    text: 'Caching AI responses saves money and latency. Cache on a hash of the prompt and model. For chat, prompt caching at the provider can reuse the static parts of long system prompts across requests.',
  },
  {
    id: 'karaoke',
    text: 'CascadiaJS is famous for its karaoke, its evergreen-forest vibe, and a tight-knit Pacific Northwest JavaScript community. This fact is here so you can see RAG ignore it when it is irrelevant to a question.',
  },
];
