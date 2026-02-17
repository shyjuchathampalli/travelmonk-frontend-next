import { API_BASE_URL } from "@/lib/api";

export async function fetchPackageBySlug(slug: string) {
  const url = `${API_BASE_URL}/packages/${slug}`;
  console.log("Fetching:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  console.log("Status:", res.status);

  if (!res.ok) {
    console.log("Not OK");
    return null;
  }

  const json = await res.json();
  console.log("Response:", json);

  return json;
}