/**
 * A safe wrapper around localStorage to prevent SecurityError exceptions in incognito
 * or corporate sandboxed environments with disabled site storage.
 * Falls back to a temporary in-memory dictionary.
 */

const memoryStorage: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`safeStorage: localStorage blocked, falling back to memory. Error: ${e}`);
      return memoryStorage[key] || null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`safeStorage: localStorage blocked, falling back to memory. Error: ${e}`);
      memoryStorage[key] = value;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`safeStorage: localStorage blocked, falling back to memory. Error: ${e}`);
      delete memoryStorage[key];
    }
  }
};
