import type { Metadata } from 'next';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { Shell } from '@/shared/components/shell';
import { getCurrentUser } from '@/shared/utils/auth';

import '@mantine/core/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'CATS (test)',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Shell user={user}>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
