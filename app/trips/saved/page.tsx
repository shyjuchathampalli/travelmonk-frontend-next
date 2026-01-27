import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SavedTripCard from "@/components/trips/SavedTripCard";

export default function SavedTripsPage() {
  return (
    <>
      <Header />

      <main className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-sm text-muted-foreground">
            Home &gt; Trips &gt;{" "}
            <span className="text-foreground">Saved Trips</span>
          </p>

          <SavedTripCard
            id="123"
            title="Varkala – Munnar – Kumarakom"
            region="South Kerala"
            duration="7 Days · Custom Package"
            images={[
              "/varkala.png",
              "/munnar.png",
              "/kumarakom.png",
            ]}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
