import TripRequestForm from "./TripRequestForm";
import TripSuggestionPanel from "./TripSuggestionPanel";

export default function TripRequestSection({
  floating = false,
}: {
  floating?: boolean;
}) {
  return (
    <section className={floating ? "" : "bg-zinc-100 py-12"}>
      <div className="mx-auto max-w-7xl px-6">
        {!floating && (
          <>
            <h1 className="text-center text-2xl font-semibold">
              REQUEST A TRIP
            </h1>
            <p className="mt-1 text-center text-sm text-gray-500">
              January 25 – February 03
            </p>
          </>
        )}

        <div
          className={`mt-6 grid gap-6 lg:grid-cols-10 ${
            floating ? "rounded-2xl bg-white p-6 shadow-2xl" : ""
          }`}
        >
          <div className="lg:col-span-7">
            <TripRequestForm />
          </div>

          <div className="lg:col-span-3">
            <TripSuggestionPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
