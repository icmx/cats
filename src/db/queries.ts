'use server';

import { db } from './client';
import { InsertUserModel, usersTable } from './schema';

export const insertUserQuery = async (
  value: InsertUserModel
): Promise<InsertUserModel> => {
  const [user] = await db.insert(usersTable).values(value).returning();

  return user;
};
