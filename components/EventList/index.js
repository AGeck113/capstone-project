import { userCar } from "@/pages";
import { useAtom } from "jotai";
import Link from "next/link";
import useSWR from "swr";
import EventCard from "../Event";

export default function EventList({ type }) {
  const [activeCar] = useAtom(userCar);

  const { data, isLoading } = useSWR(`/api/events/${activeCar.VIN}`);

  if (isLoading) {
    return <p>loading</p>;
  }

  const filteredAppointments = data.filter((appointment) => {
    return appointment.type === type;
  });

  let cost = 0;

  return (
    <>
      <Link href="/">Home</Link>
      <h1>Your {type} Events</h1>
      <ul>
        {filteredAppointments.map((appointment) => {
          cost += appointment.cost;
          return (
            <li key={appointment.id}>
              <EventCard event={appointment} />
            </li>
          );
        })}
      </ul>
      <p>
        The cost of your {type} {type === "wishlist" ? "is" : "appointments"}:{" "}
        {cost}€
      </p>
    </>
  );
}
