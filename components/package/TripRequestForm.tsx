import TripRequestFormClient from "./TripRequestFormClient";

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function TripRequestForm({
  slug,
  packageId,
  packageDays,
}: {
  slug: string;
  packageId: number;
  packageDays: number;
}) {
  await delay(2000);

  return (
    <TripRequestFormClient
      key={slug}
      slug={slug}
      packageId={packageId}
      packageDays={packageDays}
    />
  );
}
