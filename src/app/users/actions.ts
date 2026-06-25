'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

export async function createUser(formData: FormData): Promise<void> {
  const username = formData.get('username') as string;

  // @todo: maybe redirect by id to users page
  // @todo: validate here
  const [user] = await db
    .insert(usersTable)
    .values({ username })
    .returning();

  revalidatePath('/users');
  redirect('/users');
}
