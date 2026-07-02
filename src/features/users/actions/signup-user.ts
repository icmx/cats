'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sessionQueries, userQueries } from '@/db/queries';
import { ActionResult } from '@/shared/types/action-result';
import { createSessionModel, createUuid } from '@/shared/utils/auth';
import { setSessionIdCookie } from '@/shared/utils/cookie';
import { hashPassword } from '@/shared/utils/password';
import { extractErrors } from '@/shared/utils/schema';
import { AuthUserInput, authUserSchema } from '../schemas/user-schema';

export async function signupUser(
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

  try {
    const user = await userQueries.insert({
      id: createUuid(),
      createdAt: Date.now(),
      passwordHash: await hashPassword(data.password),
      username: data.username,
      role: 'default',
    });

    const session = createSessionModel(user.id);

    await sessionQueries.insert(session);
    await setSessionIdCookie(session.id, session.expiresAt);
  } catch {
    return { status: 'error', message: 'Error' };
  }

  revalidatePath('/');
  redirect('/me');
}
