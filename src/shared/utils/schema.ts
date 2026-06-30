import z from 'zod';
import { Errors } from '../types/action-result';

export async function parse<T extends z.ZodType>(
  data: Promise<unknown>,
  schema: T
): Promise<z.output<T>> {
  const resolvedData = await data;

  return schema.parse(resolvedData);
}

export function extractErrors<T>(error: z.ZodError<T>): Errors<T> {
  const flat = z.flattenError(error);

  const entries = Object.entries<string[] | undefined>(
    flat.fieldErrors
  ).map(([key, value]) => {
    return [key, value?.at(0) ?? null] as const;
  });

  return entries as Errors<T>;
}
