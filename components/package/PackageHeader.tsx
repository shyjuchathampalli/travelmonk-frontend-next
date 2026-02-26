import PackageHeaderClient from "./PackageHeaderClient";

type Props = {
  pkg: any;
  slug: string;
};

export default async function PackageHeader({ pkg, slug }: Props) {

  // ✅ DO NOT FETCH HERE
  // Client will load trip using apiFetch (same pattern as accordion)

  return (
    <PackageHeaderClient
      pkg={pkg}
      slug={slug}
      mode="package"
      trip={null}
    />
  );
}