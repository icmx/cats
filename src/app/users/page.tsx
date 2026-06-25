import Form from 'next/form';
import { selectUsersQuery } from '@/db/queries';
import { createUserAction } from './actions';
import Link from 'next/link';

export default async function Page() {
  const users = await selectUsersQuery();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>
                  <Link href={`/users/${user.id}`}>
                    {user.username}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
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
