import { Title } from '@mantine/core';
import { signupUser } from '@/features/users/actions/signup-user';
import { UserAuthForm } from '@/features/users/components/user-auth-form';

export default async function SignupPage() {
  return (
    <>
      <Title order={1}>Sign Up</Title>
      <UserAuthForm label="Sign Up" action={signupUser} />
    </>
  );
}
