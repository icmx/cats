'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { invalidateSession } from '@/shared/utils/auth';
import { getSessionIdCookie } from '@/shared/utils/cookie';

export async function signoutUser() {
  const sessionId = await getSessionIdCookie();

  if (sessionId) {
    await invalidateSession(sessionId);
  }

  revalidatePath('/');
  redirect('/');
}
