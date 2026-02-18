import PackageHeaderClient from "./PackageHeaderClient";

type Props = {
  pkg: any;
};

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function PackageHeader({ pkg }: Props) {
  await delay(2000);

  return <PackageHeaderClient pkg={pkg} />;
}
