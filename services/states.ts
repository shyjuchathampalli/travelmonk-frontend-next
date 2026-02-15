import { API_BASE_URL } from "@/lib/api";

export type State = {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
  thumbnail_image: string;
  status: boolean;
  country: {
    id: number;
    name: string;
  };
};

export async function fetchStateBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/states/${slug}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch state");
  }

  return res.json();
}
