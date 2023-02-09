import dynamic from "next/dynamic";
import Link from "next/link";

export default function EventMap() {
  const Map = dynamic(() => import("../../components/Map"), { ssr: false });

  return (
    <>
      <Map />
    </>
  );
}
