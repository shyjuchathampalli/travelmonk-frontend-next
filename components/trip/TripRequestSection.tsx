"use client";

import TripRequestCard from "./TripRequestCard/TripRequestCard";
import { State } from "@/services/states";

type Props = {
  state?: State;
  floating?: boolean;
};

export default function TripRequestSection({
  state,
  floating = false,
}: Props) {
  return (
    <section
      className={`relative z-20 ${
        floating ? "-mt-40" : "-mt-32"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <TripRequestCard state={state} />
      </div>
    </section>
  );
}