export type ItineraryStatus =
  | "draft"
  | "submitted"
  | "curated"
  | "priced"
  | "confirmed"
  | "in_progress"
  | "completed";

export interface Itinerary {
  id: string;
  days: number;
  purpose: string;
  status: ItineraryStatus;
}
