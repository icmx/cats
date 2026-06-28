'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateUserByIdQuery } from '@/db/queries';
import { UserModel } from '@/db/schema';
import { updateUserSchema } from '../schemas/user-schema';

export async function updateUser(
  prevState: UserModel | null,
  formData: FormData
): Promise<UserModel | null> {
  const result = updateUserSchema.safeParse({
    id: formData.get('id'),
    username: formData.get('username'),
    role: formData.get('role'),
  });

  if (!result.success) {
    throw new Error('Invalid input');
  }

  const { data } = result;

  await updateUserByIdQuery(data.id, {
    username: data.username,
    role: data.role,
  });

  revalidatePath('/users');
  redirect('/users');
}
