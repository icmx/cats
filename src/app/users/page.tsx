import Form from 'next/form';
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
        <div>
          <label htmlFor="field-username">Username</label>
          <input id="field-username" type="text" name="username" />
        </div>
        <div>
          <label htmlFor="field-password">Password</label>
          <input id="field-password" type="password" name="password" />
        </div>
        <button type="submit">Create</button>
      </Form>
    </>
  );
}
