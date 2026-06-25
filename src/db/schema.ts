import { InferInsertModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().unique().notNull(),
});

export type InsertUserModel = InferInsertModel<typeof usersTable>;
