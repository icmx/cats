import z from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  role: z.enum(['administrator', 'default']),
});

export const updateUserSchema = z.object({
  id: z.uuidv7(),
  username: z.string().min(1),
  role: z.enum(['administrator', 'default']),
});

export const authUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type AuthUserInput = z.infer<typeof authUserSchema>;
