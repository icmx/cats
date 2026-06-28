import type { Metadata } from 'next';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { Shell } from '@/shared/components/shell';

import '@mantine/core/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'CATS (test)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
