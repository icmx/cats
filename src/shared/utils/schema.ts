import z from 'zod';

export async function parse<T extends z.ZodType>(
  data: Promise<unknown>,
  schema: T
): Promise<z.core.output<T>> {
  const resolvedData = await data;

  return schema.parse(resolvedData);
}
