import { createUser } from '@/features/users/actions/create-user';
import { UserForm } from '@/features/users/components/user-form';

export default async function CreateUserPage() {
  return (
    <>
      <UserForm initialValues={null} action={createUser} />
    </>
  );
}
