import { API_BASE_URL } from "@/lib/api";

export type DestinationCategory = {
  id: number;
  name: string;
  icon: string;
};

export async function fetchDestinationCategories(): Promise<
  DestinationCategory[]
> {
  const res = await fetch(`${API_BASE_URL}/destination-categories`, {
    cache: "force-cache", // categories rarely change
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destination categories");
  }

  const json = await res.json();

  // ✅ IMPORTANT: unwrap Laravel API Resource response
  return Array.isArray(json) ? json : json.data;
}
