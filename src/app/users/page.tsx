import Form from 'next/form'
import { db } from '@/db/client';
import { usersTable } from '@/db/schema';
import { createUserAction } from './actions';

export default async function Page() {
  const users = await db.select().from(usersTable);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <code>{user.username}</code>
          </li>
        ))}
      </ul>
      <Form action={createUserAction}>
        <input type="text" name="username" />
        <button type="submit">Create</button>
      </Form>
    </>
  );
}
