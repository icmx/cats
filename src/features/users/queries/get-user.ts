'use server';

import { selectUserByIdQuery } from '@/db/queries';

export async function getUser(id: number) {
  const user = await selectUserByIdQuery(id);

  return user || null;
}
