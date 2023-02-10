import dynamic from "next/dynamic";

export default function EventMap() {
  const Map = dynamic(() => import("../../components/Map"), { ssr: false });

  return <Map />;
}
