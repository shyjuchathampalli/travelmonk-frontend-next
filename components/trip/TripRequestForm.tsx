import TripBasics from "./form/TripBasics";
import DestinationCategorySelect from "./form/DestinationCategorySelect";
import DestinationSuggestions from "./form/DestinationSuggestions";
import PreferencesSection from "./form/PreferencesSection";
import TravellerCount from "./form/TravellerCount";
import ActivityChecklist from "./form/ActivityChecklist";
import SubmitItineraryButton from "./form/SubmitItineraryButton";

export default function TripRequestForm() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <TripBasics />
      <TravellerCount />
      <DestinationCategorySelect />
      <DestinationSuggestions />
      <PreferencesSection />
      <ActivityChecklist />
    </div>
  );
}
