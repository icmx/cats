import z from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  role: z.enum(['administrator', 'default']),
});

export const updateUserSchema = z.object({
  id: z.coerce.number().int().min(1),
  username: z.string().min(1),
  role: z.enum(['administrator', 'default']),
});
