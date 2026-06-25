import Form from 'next/form';
import { selectUserByIdQuery } from '@/db/queries';
import { deleteUserAction } from '../actions';

export default async function Page({ params }) {
  const { id } = await params;

  const user = await selectUserByIdQuery(+id);

  return (
    <>
      <div>
        User #{user.id}: {user.username}
      </div>
      <Form action={deleteUserAction}>
        <input type="hidden" name="id" value={user.id} />
        <button type="submit">Delete</button>
      </Form>
    </>
  );
}
