"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { getLucideIcon } from "@/lib/getLucideIcon";
import { useEffect } from "react";
import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import {
  Compass,
  Mail,
  PoundSterling,
  CheckCircle,
  CreditCard,
  Plane,
  PartyPopper,
} from "lucide-react";

type Props = {
  pkg: any;
  slug: string;
  mode: "package" | "trip";
  trip: any | null;
};

export default function PackageHeaderClient({ pkg,
  slug,
  mode: initialMode,
  trip: initialTrip,
}: Props) {

  /* =====================================================
     STATE
  ===================================================== */

  const [mode, setMode] =
  useState<"package" | "trip">(initialMode);

  const [trip, setTrip] =
    useState<any | null>(initialTrip);

  const [status, setStatus] =
    useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const price = trip?.final_price;

  const STATUS_META: Record<string, any> = {
  in_progress: {
    label: "Trip Planning",
    Icon: Compass,
  },
  quote_requested: {
    label: "Quote Requested",
    Icon: Mail,
  },
  priced: {
    label: "Price Ready",
    Icon: PoundSterling,
  },
  confirmed: {
    label: "Package Confirmed",
    Icon: CheckCircle,
  },
  paid: {
    label: "Payment Completed",
    Icon: CreditCard,
  },
  active_trip: {
    label: "Trip Active",
    Icon: Plane,
  },
  completed: {
    label: "Trip Completed",
    Icon: PartyPopper,
  },
};

const PRICE_VISIBLE_STATUSES = [
  "priced",
  "confirmed",
  "paid",
  "active_trip",
  "completed",
];


  /* =====================================================
   LOAD TRIP (same pattern as DayByDayAccordion)
===================================================== */

useEffect(() => {
  const loadTrip = async () => {
    try {
      const res = await apiFetch(`/packages/${slug}/load`);
      const json = await res.json();

      setMode(json.mode);

      if (json.mode === "trip") {
        setTrip(json.data);
        setStatus(json.data.status); // ⭐ IMPORTANT
      }

    } catch (e) {
      console.error("Header load failed:", e);
    }
  };

  loadTrip();
}, [slug]);

  /* =====================================================
     STATUS UPDATE HANDLER
  ===================================================== */

  const updateStatus = async (newStatus: string) => {
    if (!trip?.id) return;

    try {
      setLoading(true);
      setSaved(false);

      const res = await apiFetch(
        `/trip-requests/${trip.id}/status`,
        {
          method: "PUT",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Status update failed");

      setStatus(newStatus);
      setSaved(true);

      setTimeout(() => setSaved(false), 2500);

    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     BUTTON STATE LOGIC
  ===================================================== */

  const canRequestQuote =
    mode === "trip" && status === "in_progress";

  const canConfirm =
    mode === "trip" && status === "priced";

  const canBook =
    mode === "trip" && status === "confirmed";

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="pb-10 border-b border-gray-200">

      {/* ================= TOP ROW ================= */}
      <div className="flex items-start justify-between mb-4">

        <div className="text-sm text-gray-400 flex items-center gap-2">
          <CalendarDays size={15} />
          <span>{pkg.number_of_days} Days</span>
        </div>

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-4">
            {pkg.categories?.map((cat: any) => {
              const Icon = getLucideIcon(cat.icon);

              return (
                <div key={cat.id} className="relative group">
                  <Icon
                    size={18}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  />

                  <div className="
                    absolute top-full mt-2 left-1/2 -translate-x-1/2
                    whitespace-nowrap px-2 py-1 text-xs font-medium
                    bg-white text-gray-700 rounded-md shadow-md
                    border border-gray-200 opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible
                    transition-all duration-150 z-50
                  ">
                    {cat.name}
                  </div>
                </div>
              );
            })}
          </div>

          {pkg.images?.route_map && (
            <RouteMapPreview image={pkg.images.route_map} />
          )}
        </div>
      </div>

      {/* ================= TITLE ================= */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-3">
        {pkg.name}
      </h1>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mb-5">
        {pkg.description}
      </p>

      {/* ================= DESTINATION THUMBNAILS ================= */}
      {pkg.destinations?.length > 0 && (
        <div className="flex gap-3">
          {pkg.destinations.map((dest: any) =>
            dest.image ? (
              <img
                key={dest.id}
                src={dest.image}
                alt={dest.name}
                className="
                  w-16 h-16 rounded-xl object-cover
                  border border-gray-100 transition-transform
                  duration-200 hover:scale-105
                "
              />
            ) : null
          )}
        </div>
      )}

      {/* ================= PRICE DISPLAY ================= */}
      {mode === "trip" &&
        price &&
        PRICE_VISIBLE_STATUSES.includes(status ?? "") && (
          <div className="mt-5 text-lg font-semibold text-gray-900">
            Package Price: <span className="text-green-600">£{price}</span>
          </div>
      )}

      {/* ================= TRIP STATUS INDICATOR ================= */}
      {mode === "trip" && status && STATUS_META[status] && (() => {

        const Icon = STATUS_META[status].Icon;

        return (
          <div className="mt-6 flex items-center gap-4">

            {/* Vertical timeline */}
            <div className="flex flex-col items-center">

              {/* top dashed line */}
              <div className="h-4 border-l border-dashed border-gray-300" />

              {/* icon circle */}
              <div
                className="
                  w-9 h-9
                  rounded-full
                  flex items-center justify-center
                  bg-orange-50
                  border border-orange-200
                  text-orange-400
                "
              >
                <Icon size={18} strokeWidth={2} />
              </div>

              {/* bottom dashed line */}
              <div className="h-4 border-l border-dashed border-gray-300" />

            </div>

            {/* Status text */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Trip Status
              </p>

              <p className="text-sm font-medium text-orange-400">
                {STATUS_META[status].label}
              </p>
            </div>

          </div>
        );
      })()}

      {/* ================= STATUS FEEDBACK ================= */}
      {saved && (
        <div className="mt-3 text-sm text-green-600">
          ✓ Status updated successfully
        </div>
      )}

      {/* ================= CTA BUTTONS ================= */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-3">

          {/* Request Quote */}
          <button
            disabled={!canRequestQuote || loading}
            onClick={() => updateStatus("quote_requested")}
            className={`
              flex-1 min-w-[160px]
              py-3 px-6 rounded-lg text-sm font-semibold transition shadow-sm
              ${
                canRequestQuote
                  ? "bg-[#ebd01b] text-black hover:brightness-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading && canRequestQuote
              ? "Processing..."
              : "Request a Quote"}
          </button>

          {/* Confirm Package */}
          <button
            disabled={!canConfirm || loading}
            onClick={() => updateStatus("confirmed")}
            className={`
              flex-1 min-w-[160px]
              py-3 px-6 rounded-lg text-sm font-semibold transition
              ${
                canConfirm
                  ? "bg-[#ebd01b] text-black hover:brightness-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Confirm Package
          </button>

          {/* Book Trip */}
          <button
            disabled={!canBook || loading}
            onClick={() => updateStatus("paid")}
            className={`
              flex-1 min-w-[160px]
              py-3 px-6 rounded-lg text-sm font-semibold transition
              ${
                canBook
                  ? "bg-[#ebd01b] text-black hover:brightness-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Book this Trip
          </button>

        </div>
      </div>

    </section>
  );
}

/* ================= ROUTE MAP COMPONENT ================= */

function RouteMapPreview({ image }: { image: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <MapPin
        size={20}
        className="text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-110"
      />

      {show && (
        <div className="
          absolute right-0 top-full mt-3 w-80 bg-white rounded-lg
          shadow-lg border border-gray-200 overflow-hidden z-50
        ">
          <img src={image} alt="Route Map" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}