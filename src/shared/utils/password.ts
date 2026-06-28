import { hash, Options, verify } from '@node-rs/argon2';

export const HASH_OPTIONS: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(text: string): Promise<string> {
  try {
    return await hash(text, HASH_OPTIONS);
  } catch {
    throw new Error('Failed to hash password');
  }
}

export async function verifyPassword(
  hash: string,
  text: string
): Promise<boolean> {
  try {
    return await verify(hash, text);
  } catch {
    throw new Error('Failed to verify password');
  }
}
