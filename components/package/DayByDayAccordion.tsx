import DayByDayAccordionClient from "./DayByDayAccordionClient";

type Props = {
  slug: string;
  dayPlans: any[];
};

// optional skeleton delay (keep if you like)
async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default function DayByDayAccordion({ slug, dayPlans }: Props) {
  return (
    <DayByDayAccordionClient
      slug={slug}
      dayPlans={dayPlans}
    />
  );
}