import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { usersTable } from './schema';

export const insertUserSchema = createInsertSchema(usersTable, {
  username: (schema) => schema.min(1).max(16),
})
  .omit({
    id: true,
    passwordHash: true,
  })
  .extend({
    password: z.string().min(1).max(512),
  });

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
