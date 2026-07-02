'use client';

import { useFormStatus } from 'react-dom';
import { Button, Group } from '@mantine/core';
import { signoutUser } from '../../actions/signout-user';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} loading={pending}>
      Sign Out
    </Button>
  );
}

export function UserQuitForm() {
  return (
    <form action={signoutUser}>
      <Group justify="flex-start" mt="md">
        <SubmitButton />
      </Group>
    </form>
  );
}
