const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/**
 * Generic fetch wrapper for Strapi API calls.
 * Centralises headers, base URL, and error handling.
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export default fetchAPI;
