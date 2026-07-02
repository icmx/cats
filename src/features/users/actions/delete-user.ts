'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { userQueries } from '@/db/queries';

export async function deleteUser(id: string) {
  await userQueries.deleteById(id);

  revalidatePath('/users');
  redirect('/users');
}
