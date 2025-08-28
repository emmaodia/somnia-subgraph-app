import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ApolloWrapper from '@/components/ApolloWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Counter Subgraph UI',
  description: 'Somnia Testnet Counter Subgraph Explorer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
