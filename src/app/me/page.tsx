import { redirect } from 'next/navigation';
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
  Title,
} from '@mantine/core';
import { UserQuitForm } from '@/features/users/components/user-quit-form';
import { getCurrentUser } from '@/shared/utils/auth';

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/signin');
  }

  return (
    <>
      <Title order={1} mb="lg">
        My Profile
      </Title>
      <DataList>
        <DataListItem>
          <DataListItemLabel>ID</DataListItemLabel>
          <DataListItemValue>{user.id}</DataListItemValue>
        </DataListItem>
        <DataListItem>
          <DataListItemLabel>Username</DataListItemLabel>
          <DataListItemValue>{user.username}</DataListItemValue>
        </DataListItem>
      </DataList>
      <UserQuitForm />
    </>
  );
}
