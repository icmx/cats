'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  Anchor,
  AppShell,
  Burger,
  Code,
  Divider,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UserModel } from '@/db/schema';

export type ShellProps = {
  children: ReactNode;
  user: UserModel | undefined;
};

export function Shell({
  user,
  children,
}: Readonly<{
  user: UserModel | undefined;
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
          {user && <Code>user: {user.username}</Code>}

          <Anchor component={Link} href={`/`}>
            Home
          </Anchor>

          <Anchor component={Link} href={`/users`}>
            Users
          </Anchor>

          <Divider />

          <Anchor component={Link} href={`/signup`}>
            Sign Up
          </Anchor>

          <Anchor component={Link} href={`/signin`}>
            Sign In
          </Anchor>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
