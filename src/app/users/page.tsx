import Form from 'next/form';
import Link from 'next/link';
import { selectUsersQuery } from '@/db/queries';
import { createUserAction } from './actions';

export default async function Page() {
  const users = await selectUsersQuery();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Created at</th>
            <th>Role</th>
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
                <td>{new Date(user.createdAt).toISOString()}</td>
                <td>{user.role}</td>
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
        <div>
          <label htmlFor="field-role">Role</label>
          <select id="field-select" name="role" defaultValue="default">
            <option value="administrator">Administrator</option>
            <option value="default">Default</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </Form>
    </>
  );
}
