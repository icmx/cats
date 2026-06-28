import {
  ActionIcon,
  Anchor,
  Badge,
  Group,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
} from '@mantine/core';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr';
import { selectUsersQuery } from '@/db/queries';
import { Time } from '@/shared/components/time';

export default async function Page() {
  const users = await selectUsersQuery();

  return (
    <>
      <Title order={1} mb="lg">
        <Group justify="space-between">
          <span>Users</span>
          <ActionIcon component={'a'} href={`/users/new`}>
            <PlusIcon size={16} />
          </ActionIcon>
        </Group>
      </Title>

      <Table>
        <TableThead>
          <TableTr>
            <TableTh>ID</TableTh>
            <TableTh>Username</TableTh>
            <TableTh>Created</TableTh>
            <TableTh>Role</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {users.map((user) => {
            return (
              <TableTr key={user.id}>
                <TableTd>
                  <Anchor component={'a'} href={`/users/${user.id}`}>
                    #{user.id}
                  </Anchor>
                </TableTd>
                <TableTd>{user.username}</TableTd>
                <TableTd>
                  <Time dateTime={user.createdAt} />
                </TableTd>
                <TableTd>
                  <Badge>{user.role}</Badge>
                </TableTd>
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
    </>
  );
}
