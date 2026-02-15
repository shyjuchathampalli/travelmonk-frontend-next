"use client";

import { useEffect, useState } from "react";
import { fetchPackages, Package } from "@/services/packages";
import PackageCard from "./PackageCard";
import { State } from "@/services/states";

export default function LatestPackagesSection({
  state,
}: {
  state: State;
}) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [arrivalPoint, setArrivalPoint] = useState<number | undefined>();
  const [categories, setCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadPackages() {
    setLoading(true);
    try {
      const data = await fetchPackages({
        latest: true,
        arrival_point_id: arrivalPoint,
        category_ids: categories,
      });

      setPackages(data.data ?? data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPackages();
  }, [arrivalPoint, categories]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-10">
        Latest Packages in {state.name}
        </h2>

      {loading && (
        <p className="text-gray-400 text-sm">Loading packages…</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
