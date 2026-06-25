import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { usersTable } from './schema';

export const insertUserSchema = createInsertSchema(usersTable, {
  username: (schema) => schema.min(1).max(16),
}).omit({
  id: true,
});

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
