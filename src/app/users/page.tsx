import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { createUser } from './actions';

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
      <form action={createUser}>
        <input type="text" name="username" />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
