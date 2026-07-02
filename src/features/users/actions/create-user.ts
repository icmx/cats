'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { userQueries } from '@/db/queries';
import { ActionResult } from '@/shared/types/action-result';
import { hashPassword } from '@/shared/utils/password';
import { extractErrors } from '@/shared/utils/schema';
import {
  CreateUserInput,
  createUserSchema,
} from '../schemas/user-schema';
import { createUuid } from '@/shared/utils/auth';

export async function createUser(
  input: CreateUserInput
): Promise<ActionResult<CreateUserInput>> {
  const result = createUserSchema.safeParse(input);

  if (!result.success) {
    return {
      status: 'error',
      errors: extractErrors(result.error),
      message: 'Invalid input',
    };
  }

  const { data } = result;

  try {
    await userQueries.insert({
      id: createUuid(),
      createdAt: Date.now(),
      role: data.role,
      username: data.username,
      passwordHash: await hashPassword(data.password),
    });
  } catch {
    return {
      status: 'error',
      message: 'Failed to create user',
    };
  }

  revalidatePath('/users');
  redirect('/users');
}
