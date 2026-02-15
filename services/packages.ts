import { API_BASE_URL } from "@/lib/api";

export type Package = {
  id: number;
  name: string;
  description: string;
  number_of_days: number;
  base_price: string;
  day_plans?: any[];
};

export async function fetchPackages(params: {
  arrival_point_id?: number;
  category_ids?: number[];
  latest?: boolean;
}) {
  const searchParams = new URLSearchParams();

  if (params.latest) {
    searchParams.append("latest", "true");
  }

  if (params.arrival_point_id) {
    searchParams.append(
      "arrival_point_id",
      String(params.arrival_point_id)
    );
  }

  if (params.category_ids?.length) {
    searchParams.append(
      "category_ids",
      params.category_ids.join(",")
    );
  }

  searchParams.append("with_day_plans", "true");

  const res = await fetch(
    `${API_BASE_URL}/packages?${searchParams.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  return res.json();
}
