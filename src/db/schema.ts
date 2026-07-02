import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey().unique(),
  createdAt: integer('created_at').notNull(),
  role: text('role', { enum: ['default', 'administrator'] }).notNull(),
  username: text('username').unique().notNull(),
  passwordHash: text('pasword_hash').notNull(),
});

export type UserInsertModel = typeof usersTable.$inferInsert;

export type UserUpdateModel = Omit<
  Partial<typeof usersTable.$inferInsert>,
  'id'
>;

export type UserSelectModel = typeof usersTable.$inferSelect;

export type UserModel = Omit<UserSelectModel, 'passwordHash'>;

export const sessionsTable = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
});

export type SessionInsertModel = typeof sessionsTable.$inferInsert;

export type SessionUpdateModel = Partial<SessionInsertModel>;

export type SessionModel = typeof sessionsTable.$inferSelect;
