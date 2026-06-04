export const metadata = {
  title: 'CascadiaJS Chat',
  description: 'A minimal Vercel AI SDK streaming chat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
