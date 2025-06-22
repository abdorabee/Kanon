// Simple in-memory storage for server-side session data
// In a production environment, you would use a more robust solution like Redis

interface SessionData {
  [key: string]: unknown;
}

// In-memory storage (this will be cleared on server restart)
const sessionStore: SessionData = {};

/**
 * Store data in the server-side session
 * @param id - Unique identifier for the session
 * @param data - Data to store
 */
export function storeSessionData(id: string, data: unknown): void {
  sessionStore[id] = data;
}

/**
 * Retrieve data from the server-side session
 * @param id - Unique identifier for the session
 * @returns The stored data or null if not found
 */
export function getSessionData(id: string): unknown {
  return sessionStore[id] || null;
}

/**
 * Generate a unique session ID
 * @returns A unique ID string
 */
export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
