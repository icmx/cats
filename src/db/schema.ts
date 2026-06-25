import { InferInsertModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  createdAt: integer().notNull(),
  role: text({ enum: ['default', 'administrator'] }).notNull(),
  username: text().unique().notNull(),
  passwordHash: text().notNull(),
});

export type InsertUserModel = InferInsertModel<typeof usersTable>;
