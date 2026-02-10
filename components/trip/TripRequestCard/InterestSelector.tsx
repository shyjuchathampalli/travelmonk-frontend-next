import {
  Palmtree,
  Mountain,
  Waves,
  Landmark,
} from "lucide-react";

const INTERESTS = [
  { label: "Beaches", icon: Palmtree },
  { label: "Hill Station", icon: Mountain },
  { label: "Backwaters", icon: Waves },
  { label: "Temples", icon: Landmark },
];

export default function InterestSelector() {
  return (
    <div className="flex flex-wrap gap-6 text-gray-400">
      {INTERESTS.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="flex flex-col items-center gap-2 hover:text-gray-700 transition"
        >
          <Icon size={24} />
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}
