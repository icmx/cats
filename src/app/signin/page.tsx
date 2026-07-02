import { Title } from '@mantine/core';
import { signinUser } from '@/features/users/actions/signin-user';
import { UserAuthForm } from '@/features/users/components/user-auth-form';

export default async function SigninPage() {
  return (
    <>
      <Title order={1}>Sign In</Title>
      <UserAuthForm label="Sign In" action={signinUser} />
    </>
  );
}
