import { cache } from 'react';
import { v7 } from 'uuid';
import { sessionQueries, userQueries } from '@/db/queries';
import { SessionModel } from '@/db/schema';
import { getSessionIdCookie } from './cookie';

export const createUuid = (): string => {
  return v7();
};

/**
 * 30 days
 */
export const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30;

export const createSessionModel = (userId: string): SessionModel => {
  const id = createUuid();
  const expiresAt = Date.now() + SESSION_DURATION;

  return { id, userId, expiresAt };
};

export async function validateSession(
  sessionId: string
): Promise<SessionModel | false> {
  const session = await sessionQueries.selectById(sessionId);

  if (!session) {
    return false;
  }

  if (session.expiresAt <= Date.now()) {
    await sessionQueries.deleteById(sessionId);

    return false;
  }

  return session;
}

export async function invalidateSession(
  sessionId: string
): Promise<void> {
  await sessionQueries.deleteById(sessionId);
}

export const getCurrentUser = cache(async () => {
  const sessionId = await getSessionIdCookie();

  if (!sessionId) {
    return undefined;
  }

  const session = await validateSession(sessionId);

  if (!session) {
    return undefined;
  }

  const user = await userQueries.selectById(session.userId);

  return user;
});
