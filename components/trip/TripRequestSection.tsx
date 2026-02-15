"use client";

import TripRequestCard from "./TripRequestCard/TripRequestCard";
import { State } from "@/services/states";

export default function TripRequestSection({
  state,
}: {
  state: State;
}) {
  return (
    <section className="relative -mt-32 z-20">
      <div className="max-w-6xl mx-auto px-6">
        <TripRequestCard state={state} />
      </div>
    </section>
  );
}
