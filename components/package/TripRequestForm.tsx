import TripRequestFormClient from "./TripRequestFormClient";

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function TripRequestForm() {
  await delay(2000); // 👈 skeleton delay

  return <TripRequestFormClient />;
}
