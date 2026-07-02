'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sessionQueries, userQueries } from '@/db/queries';
import { ActionResult } from '@/shared/types/action-result';
import { createSessionModel } from '@/shared/utils/auth';
import { setSessionIdCookie } from '@/shared/utils/cookie';
import { verifyPassword } from '@/shared/utils/password';
import { extractErrors } from '@/shared/utils/schema';
import { AuthUserInput, authUserSchema } from '../schemas/user-schema';

export async function signinUser(
  input: AuthUserInput
): Promise<ActionResult<AuthUserInput>> {
  const result = authUserSchema.safeParse(input);

  if (!result.success) {
    return {
      status: 'error',
      errors: extractErrors(result.error),
      message: 'Invalid input',
    };
  }

  const { data } = result;

  const user = await userQueries.UNSAFE_selectFullRowByUsername(
    data.username
  );

  if (!user) {
    return { status: 'error', message: 'Wrong username or password' };
  }

  const isVerified = await verifyPassword(
    user.passwordHash,
    data.password
  );

  if (!isVerified || !user) {
    return { status: 'error', message: 'Wrong username or password' };
  }

  const session = createSessionModel(user.id);

  await sessionQueries.insert(session);
  await setSessionIdCookie(session.id, session.expiresAt);

  revalidatePath('/');
  redirect('/me');
}
