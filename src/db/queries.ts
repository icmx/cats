'use server';

import { eq } from 'drizzle-orm';
import { db } from './client';
import { InsertUserModel, usersTable } from './schema';

export const insertUserQuery = async (
  value: InsertUserModel
): Promise<InsertUserModel> => {
  const [user] = await db.insert(usersTable).values(value).returning();

  return user;
};

export const selectUsersQuery = async () => {
  const users = await db.select().from(usersTable);

  return users;
};

export const selectUserByIdQuery = async (id: number) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return user;
};

export const deleteUserQuery = async (id: number) => {
  await db.delete(usersTable).where(eq(usersTable.id, id));
};
