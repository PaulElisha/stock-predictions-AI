/** @format */

// Simple helper to get environment variables with defaults
// No dependencies to avoid circular imports
export function getEnv(key: string, defaultValue: string = ""): string {
  const value = process.env[key];
  if (!value) {
    if (!defaultValue) {
      console.warn(`Warning: Missing environment variable: ${key}`);
    }
    return defaultValue;
  }
  return value;
}
