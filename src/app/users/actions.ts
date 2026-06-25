'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertUserQuery } from '@/db/queries';
import { insertUserSchema } from '@/db/validation';

export const createUserAction = async (formData: FormData) => {
  const result = insertUserSchema.safeParse({
    username: formData.get('username'),
  });

  if (!result.success) {
    throw new Error('Invalid input');
  }

  await insertUserQuery(result.data);

  revalidatePath('/users');
  redirect('/users');
};
