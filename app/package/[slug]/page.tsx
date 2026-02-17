import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackageHeader from "@/components/package/PackageHeader";
import TripRequestForm from "@/components/package/TripRequestForm";
import DayByDayAccordion from "@/components/package/DayByDayAccordion";
import { fetchPackageBySlug } from "@/services/packageDetails";

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 🔥 MUST await

  console.log("Slug:", slug);

  const response = await fetchPackageBySlug(slug);

  if (!response?.data) return notFound();

  const pkg = response.data;

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* RIGHT SIDE - 60% */}
          <div className="lg:col-span-3">
            <TripRequestForm />
            <DayByDayAccordion dayPlans={pkg.day_plans} />
          </div>

          {/* LEFT SIDE - 40% */}
          <div className="lg:col-span-2">
            <PackageHeader pkg={pkg} />
          </div>

          

        </div>
      </div>
      <Footer />
      </>
  );
}