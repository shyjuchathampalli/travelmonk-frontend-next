import Image from "next/image";

export default function TripSuggestionPanel() {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="font-semibold mb-2">
        Varkala – Munnar – Kumarakom (7 Days)
      </h3>

      <Image
        src="/kerala-map.png"
        alt="Kerala Route"
        width={300}
        height={300}
        className="mx-auto"
      />

      <ul className="mt-4 space-y-1 text-sm text-gray-600">
        <li>Day 1</li>
        <li>Day 2</li>
        <li>Day 3</li>
        <li>Day 4</li>
      </ul>

      <button className="mt-4 w-full rounded bg-green-500 py-2 text-white">
        Create Your Itinerary
      </button>
    </div>
  );
}
