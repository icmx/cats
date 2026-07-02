'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { userQueries } from '@/db/queries';
import { ActionResult } from '@/shared/types/action-result';
import { extractErrors } from '@/shared/utils/schema';
import {
  UpdateUserInput,
  updateUserSchema,
} from '../schemas/user-schema';

export async function updateUser(
  input: UpdateUserInput
): Promise<ActionResult<UpdateUserInput>> {
  const result = updateUserSchema.safeParse(input);

  if (!result.success) {
    return {
      status: 'error',
      errors: extractErrors(result.error),
      message: 'Invalid input',
    };
  }

  const { data } = result;

  try {
    await userQueries.updateById(data.id, {
      username: data.username,
      role: data.role,
    });
  } catch {
    return {
      status: 'error',
      message: 'Failed to update user',
    };
  }

  revalidatePath('/users');
  redirect('/users');
}
