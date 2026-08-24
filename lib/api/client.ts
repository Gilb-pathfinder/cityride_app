// Mock-first API service layer.
//
// Every function here resolves against local mock data behind a simulated
// network delay. When the real CityRide backend is ready, swap the body of
// each function in lib/api/*.ts for a `fetch(`${API_BASE_URL}/...`)` call —
// the function signatures and return types are already shaped to match the
// approved API specification, so callers in components do not need to change.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function simulate<T>(data: T, delayMs = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}
