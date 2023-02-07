import EventCard from "@/components/Event";
import { useRouter } from "next/router";
import useSWR from "swr";
import Details from "../../components/AppointmentDetails";
export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/appointments/${id}` : null);

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
      <EventCard appointment={data} />
      <Details appointment={data} />
    </>
  );
}
