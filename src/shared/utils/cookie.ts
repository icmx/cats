import { cookies } from 'next/headers';

export const SESSION_ID_COOKIE_NAME = 'sesssion';

export async function setSessionIdCookie(
  sessionId: string,
  expiresAt: number
): Promise<void> {
  const store = await cookies();

  store.set(SESSION_ID_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function deleteSessionIdCookie(): Promise<void> {
  const store = await cookies();

  store.delete(SESSION_ID_COOKIE_NAME);
}

export async function getSessionIdCookie(): Promise<
  string | undefined
> {
  const store = await cookies();
  const sessionId =
    store.get(SESSION_ID_COOKIE_NAME)?.value ?? undefined;

  return sessionId;
}
