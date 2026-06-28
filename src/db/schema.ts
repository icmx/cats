import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  createdAt: integer().notNull(),
  role: text({ enum: ['default', 'administrator'] }).notNull(),
  username: text().unique().notNull(),
  passwordHash: text().notNull(),
});

export type InsertUserModel = typeof usersTable.$inferInsert;

export type UpdateUserModel = Omit<
  Partial<typeof usersTable.$inferInsert>,
  'id'
>;

export type UserModel = Omit<
  typeof usersTable.$inferSelect,
  'passwordHash'
>;
