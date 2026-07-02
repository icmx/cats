import { eq } from 'drizzle-orm';
import { db } from './client';
import {
  SessionInsertModel,
  SessionModel,
  sessionsTable,
  UserSelectModel,
  UserInsertModel,
  UserModel,
  usersTable,
  UserUpdateModel,
} from './schema';

export const userQueries = {
  async insert(model: UserInsertModel): Promise<UserModel> {
    const results = await db
      .insert(usersTable)
      .values(model)
      .returning({
        id: usersTable.id,
        createdAt: usersTable.createdAt,
        role: usersTable.role,
        username: usersTable.username,
      });

    return results[0];
  },

  async select(): Promise<UserModel[]> {
    const results = await db
      .select({
        id: usersTable.id,
        createdAt: usersTable.createdAt,
        role: usersTable.role,
        username: usersTable.username,
      })
      .from(usersTable);

    return results;
  },

  async selectById(id: string): Promise<UserModel | undefined> {
    const results = await db
      .select({
        id: usersTable.id,
        createdAt: usersTable.createdAt,
        role: usersTable.role,
        username: usersTable.username,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return results[0] ?? undefined;
  },

  async UNSAFE_selectFullRowByUsername(
    username: string
  ): Promise<UserSelectModel | undefined> {
    const results = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    return results.at(0) ?? undefined;
  },

  async updateById(
    id: string,
    model: UserUpdateModel
  ): Promise<UserModel> {
    const results = await db
      .update(usersTable)
      .set(model)
      .where(eq(usersTable.id, id))
      .returning({
        id: usersTable.id,
        createdAt: usersTable.createdAt,
        role: usersTable.role,
        username: usersTable.username,
      });

    return results[0];
  },

  async deleteById(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  },
};

export const sessionQueries = {
  async insert(model: SessionInsertModel): Promise<SessionModel> {
    const results = await db
      .insert(sessionsTable)
      .values(model)
      .returning();

    return results[0];
  },

  async selectById(id: string): Promise<SessionModel | undefined> {
    const results = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));

    return results[0] ?? undefined;
  },

  async deleteById(id: string): Promise<void> {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, id));
  },
};
