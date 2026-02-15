// lib/tripLocations.ts

export type TripLocation = {
  name: string;
  tagline: string;
  heroImage: string;
  minDays: number;
  arrivalHints: string[];
  categories: string[];
  suggestedTrips?: {
    title: string;
    days: number;
  }[];
};

export const TRIP_LOCATIONS: Record<string, TripLocation> = {
  kerala: {
    name: "Kerala",
    tagline: "God’s Own Country",
    heroImage: "/images/hero/kerala.jpg",
    minDays: 7,
    arrivalHints: ["Kochi", "Trivandrum", "Calicut"],
    categories: [
      "Beaches",
      "Hill Stations",
      "Backwaters",
      "Waterfalls",
      "Wildlife",
      "Pilgrimage",
    ],
    suggestedTrips: [
      {
        title: "Varkala – Munnar – Kumarakom",
        days: 7,
      },
    ],
  },

  "tamil-nadu": {
    name: "Tamil Nadu",
    tagline: "Land of Temples & Heritage",
    heroImage: "/images/hero/tamilnadu.jpg",
    minDays: 6,
    arrivalHints: ["Chennai", "Coimbatore", "Madurai"],
    categories: [
      "Temples",
      "Hill Stations",
      "Heritage",
      "Beaches",
    ],
  },
};
