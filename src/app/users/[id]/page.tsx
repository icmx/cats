import { notFound } from 'next/navigation';
import { Button, Divider, Group, Title } from '@mantine/core';
import z from 'zod';
import { updateUser } from '@/features/users/actions/update-user';
import { deleteUser } from '@/features/users/actions/delete-user';
import { UserForm } from '@/features/users/components/user-form';
import { getUser } from '@/features/users/queries/get-user';
import { parse } from '@/shared/utils/schema';

const paramsSchema = z.object({
  id: z.coerce.number().int().min(1),
});

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<unknown>;
}) {
  const { id } = await parse(params, paramsSchema);
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  const handleDelete = async function () {
    'use server';

    await deleteUser(id);
  };

  return (
    <>
      <UserForm initialValues={user} action={updateUser} />

      <Divider my="md" />

      <Title order={2} my="lg">
        Danger area
      </Title>
      <Group justify="left">
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </>
  );
}
