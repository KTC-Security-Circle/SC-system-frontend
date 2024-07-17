import './globals.css';
import type { AppProps } from 'next/app';
import { ChatProvider } from '../components/elements/ChatContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
