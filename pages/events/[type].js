import EventList from "@/components/EventList";

import { useRouter } from "next/router";

export default function EventsPage() {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <EventList type={type} />
    </>
  );
}
