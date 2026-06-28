import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteUserByIdQuery } from '@/db/queries';

export async function deleteUser(id: number) {
  await deleteUserByIdQuery(id);

  revalidatePath('/users');
  redirect('/users');
}
