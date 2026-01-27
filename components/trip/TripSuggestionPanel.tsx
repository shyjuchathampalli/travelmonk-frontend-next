"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const trips = [
  {
    id: 1,
    title: "Varkala – Munnar – Kumarakom (7 Days)",
    image: "/trip_route11.png",
    plan: [
      "Arrival and beachside relaxation",
      "Cliff views and cultural walk",
      "Scenic drive to Munnar",
      "Tea gardens and hill exploration",
      "Wildlife and spice plantation visit",
      "Backwater cruise and village life",
      "Departure and local shopping",
    ],
  },
  {
    id: 2,
    title: "Wayanad – Calicut – Bekal (7 Days)",
    image: "/trip_route12.png",
    plan: [
      "Arrival in Wayanad hills",
      "Waterfalls and forest trails",
      "Edakkal caves exploration",
      "Drive to Calicut city",
      "Heritage walk and food trail",
      "Bekal fort and beach sunset",
      "Return journey",
    ],
  },
  {
    id: 3,
    title: "Kovalam – Thekkady – Alleppey (7 Days)",
    image: "/trip_route13.png",
    plan: [
      "Arrival and coastal leisure",
      "Lighthouse and seaside cafés",
      "Drive to Thekkady hills",
      "Periyar wildlife exploration",
      "Spice gardens and cultural show",
      "Houseboat backwater experience",
      "Departure day",
    ],
  },
  {
    id: 4,
    title: "Ponmudi – Varkala – Ashtamudi (7 Days)",
    image: "/trip_route14.png",
    plan: [
      "Arrival and Ponmudi ascent",
      "Hill viewpoints and nature walks",
      "Drive to Varkala cliffs",
      "Beach yoga and leisure",
      "Transfer to Ashtamudi lake",
      "Backwater canoe experience",
      "Departure day",
    ],
  },
  {
    id: 5,
    title: "Silent Valley – Palakkad – Thrissur (7 Days)",
    image: "/trip_route15.png",
    plan: [
      "Arrival near Silent Valley",
      "Rainforest exploration",
      "Nature interpretation trails",
      "Drive to Palakkad town",
      "Heritage and fort visit",
      "Thrissur cultural highlights",
      "Departure",
    ],
  },
];

export default function TripSuggestionPanel() {
  const [activeTrip, setActiveTrip] = useState<number>(trips[0].id);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
        Suggested Trips
      </h3>

      <div className="space-y-3">
        {trips.map((trip) => {
          const isActive = activeTrip === trip.id;

          return (
            <div
              key={trip.id}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setActiveTrip(trip.id)}
                className={`
                  flex w-full items-center justify-between px-4 py-3 text-left
                  transition
                  ${
                    isActive
                      ? "bg-teal-900 text-white"
                      : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-sm font-medium">{trip.title}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isActive ? "rotate-180 text-white" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {isActive && (
                <div className="bg-white px-4 py-4">
                  {/* Route Image */}
                  <div className="mb-4 border-b border-dashed border-gray-300 pb-3">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      width={280}
                      height={160}
                      className="mx-auto rounded-lg shadow-sm"
                    />
                  </div>

                  {/* Day-wise Plan */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Trip Plan
                    </p>

                    <div className="divide-y divide-gray-200">
                      {trip.plan.map((text, index) => (
                        <div
                          key={index}
                          className="flex gap-3 py-2 text-sm text-gray-700"
                        >
                          <span className="font-medium text-gray-500">
                            Day {index + 1}
                          </span>
                          <span className="leading-snug">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className="w-full rounded-lg bg-teal-700 py-2.5 text-sm
                               font-semibold text-white hover:bg-teal-800 transition"
                  >
                    Select This Trip
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
