'use server';

import { eq } from 'drizzle-orm';
import { db } from './client';
import {
  InsertUserModel,
  UpdateUserModel,
  UserModel,
  usersTable,
} from './schema';

export const insertUserQuery = async (
  value: InsertUserModel
): Promise<number> => {
  const results = await db.insert(usersTable).values(value).returning();
  const id = results.at(0)?.id ?? 0;

  return id;
};

export const updateUserByIdQuery = async (
  id: number,
  value: UpdateUserModel
): Promise<void> => {
  await db.update(usersTable).set(value).where(eq(usersTable.id, id));
};

export const deleteUserByIdQuery = async (
  id: number
): Promise<void> => {
  await db.delete(usersTable).where(eq(usersTable.id, id));
};

export const selectUsersQuery = async (): Promise<UserModel[]> => {
  const results = await db
    .select({
      id: usersTable.id,
      createdAt: usersTable.createdAt,
      role: usersTable.role,
      username: usersTable.username,
    })
    .from(usersTable);

  return results;
};

export const selectUserByIdQuery = async (
  id: number
): Promise<UserModel | undefined> => {
  const results = await db
    .select({
      id: usersTable.id,
      createdAt: usersTable.createdAt,
      role: usersTable.role,
      username: usersTable.username,
    })
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return results.at(0) ?? undefined;
};
