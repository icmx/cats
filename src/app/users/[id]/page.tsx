import { notFound } from 'next/navigation';
import { Button, Divider, Group, Title } from '@mantine/core';
import z from 'zod';
import { userQueries } from '@/db/queries';
import { deleteUser } from '@/features/users/actions/delete-user';
import { UserUpdateForm } from '@/features/users/components/user-update-form';
import { parse } from '@/shared/utils/schema';

const paramsSchema = z.object({
  id: z.string().min(1),
});

export default async function UpdateUserPage({
  params,
}: {
  params: Promise<unknown>;
}) {
  const { id } = await parse(params, paramsSchema);
  const user = await userQueries.selectById(id);

  if (!user) {
    notFound();
  }

  const handleDelete = async function () {
    'use server';

    await deleteUser(id);
  };

  return (
    <>
      <UserUpdateForm defaultValues={user} />

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
