import DayByDayAccordionClient from "./DayByDayAccordionClient";

type Props = {
  dayPlans: any[];
};

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function DayByDayAccordion({ dayPlans }: Props) {
  await delay(2000); // 👈 skeleton delay

  return <DayByDayAccordionClient dayPlans={dayPlans} />;
}