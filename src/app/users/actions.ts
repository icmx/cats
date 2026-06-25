'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteUserQuery, insertUserQuery } from '@/db/queries';
import { insertUserSchema } from '@/db/validation';
import { hashPassword } from '@/utils/password';

export const createUserAction = async (formData: FormData) => {
  const result = insertUserSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!result.success) {
    throw new Error('Invalid input');
  }

  const { data } = result;

  await insertUserQuery({
    username: data.username,
    passwordHash: await hashPassword(data.password),
  });

  revalidatePath('/users');
  redirect('/users');
};

export const deleteUserAction = async (formData: FormData) => {
  const id = +(formData.get('id') || 0);

  await deleteUserQuery(id);

  revalidatePath('/users');
  redirect('/users');
};
