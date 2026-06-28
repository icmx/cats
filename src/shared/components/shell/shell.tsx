'use client';

import Link from 'next/link';
import { Anchor, AppShell, Burger, Code, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function Shell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 32 }}
      navbar={{
        width: 100,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Code color="gray">CATS (test)</Code>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack align="stretch" gap="md">
          <Anchor component={Link} href={`/`}>
            Home
          </Anchor>

          <Anchor component={Link} href={`/users`}>
            Users
          </Anchor>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
