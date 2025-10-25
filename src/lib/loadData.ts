/**
 * loadData.ts
 * Utility functions to fetch JSON data stored in /public/data/
 * for use in pages and components (Projects, Experience, Blog, etc.)
 */

export type DataType =
  | "projects"
  | "experience"
  | "skills"
  | "articles"
  | "social";

/**
 * Fetches a JSON file from /public/data/<file>.json
 * @param type - one of "projects", "experience", "skills", "articles", or "social"
 * @returns Parsed JSON data or an empty array if fetch fails
 */
export async function loadData<T = any>(type: DataType): Promise<T[]> {
  try {
    const res = await fetch(`/data/${type}.json`);
    if (!res.ok) throw new Error(`Failed to load ${type}.json`);
    const data = await res.json();
    return data as T[];
  } catch (error) {
    console.error(`[loadData] Error loading ${type}:`, error);
    return [];
  }
}

/**
 * Example: Preload multiple JSONs at once
 * Useful for dashboards, pre-hydration, or global contexts
 */
export async function preloadAllData() {
  const types: DataType[] = [
    "projects",
    "experience",
    "skills",
    "articles",
    "social",
  ];

  const results: Record<DataType, any[]> = {
    projects: [],
    experience: [],
    skills: [],
    articles: [],
    social: [],
  };

  await Promise.all(
    types.map(async (type) => {
      results[type] = await loadData(type);
    })
  );

  return results;
}
