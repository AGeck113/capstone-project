import { userCar } from "@/pages";
import { useAtom } from "jotai";
import styled from "styled-components";
import useSWR from "swr";
import CostOverwiev from "../CostOverview";
import EventCard from "../Event";

const EventContainer = styled.ul`
  position: relative;
  list-style: none;
  display: grid;
  padding: 0;
`;
export default function EventList({ type }) {
  const [activeCar] = useAtom(userCar);
  const { data, isLoading } = useSWR(`/api/appointments/`);

  if (isLoading) {
    return <p>loading</p>;
  }

  const filteredAppointments = data.filter((appointment) => {
    return appointment.type === type && appointment.vin === activeCar.VIN;
  });

  let cost = 0;

  return (
    <>
      <EventContainer>
        {filteredAppointments.map((appointment) => {
          cost += appointment.cost;
          return (
            <li key={appointment._id}>
              <EventCard appointment={appointment} />
            </li>
          );
        })}
      </EventContainer>
      <CostOverwiev type={type} cost={cost} />
    </>
  );
}
