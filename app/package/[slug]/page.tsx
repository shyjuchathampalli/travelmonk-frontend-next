import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackageHeader from "@/components/package/PackageHeader";
import TripRequestForm from "@/components/package/TripRequestForm";
import DayByDayAccordion from "@/components/package/DayByDayAccordion";
import { fetchPackageBySlug } from "@/services/packageDetails";
import TripRequestFormSkeleton from "@/components/package/TripRequestFormSkeleton";
import DayByDayAccordionSkeleton from "@/components/package/DayByDayAccordionSkeleton";
import PackageHeaderSkeleton from "@/components/package/PackageHeaderSkeleton";

export default async function PackagePage({
  params,
}: {
  params: { slug: string };
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
            <Suspense fallback={<TripRequestFormSkeleton />}>
              <TripRequestForm 
                slug={slug} 
                packageId={pkg.id}
                packageDays={pkg.number_of_days} 
              />
            </Suspense>

            <Suspense fallback={<DayByDayAccordionSkeleton />}>
              <DayByDayAccordion
                slug={slug}
                dayPlans={pkg.day_plans}
              />
            </Suspense>
          </div>

          {/* LEFT SIDE - 40% */}
          <div className="lg:col-span-2">
            <Suspense fallback={<PackageHeaderSkeleton />}>
              <PackageHeader pkg={pkg} />
            </Suspense>
          </div>

          

        </div>
      </div>
      <Footer />
      </>
  );
}