'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserModel } from '@/db/schema';
import { insertUserQuery } from '@/db/queries';
import { hashPassword } from '@/shared/utils/password';
import { createUserSchema } from '../schemas/user-schema';

export async function createUser(
  prevState: UserModel | null,
  formData: FormData
): Promise<UserModel | null> {
  const result = createUserSchema.safeParse({
    username: formData.get('username'),
    role: formData.get('role'),
    password: formData.get('password'),
  });

  if (!result.success) {
    throw new Error('Invalid input');
  }

  const { data } = result;

  await insertUserQuery({
    createdAt: Date.now(),
    role: data.role,
    username: data.username,
    passwordHash: await hashPassword(data.password),
  });

  revalidatePath('/users');
  redirect('/users');
}
