import AddEventForm from "@/components/AddEventForm";
import EventList from "@/components/EventList";
import SVGIcon from "@/components/Icons";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { userCar } from "..";

const StyledHeadline = styled.h2`
  font-size: 1.8rem;
  color: lightgray;
  margin 0.5rem auto 2rem auto;
  text-align: center
`;
const StyledAddButton = styled.button`
  border-radius: 999px;
  background-color: limegreen;
  position: absolute;
  z-index: 10;
`;
export default function EventsPage() {
  const router = useRouter();
  const { type } = router.query;
  const [isEditing, setIsEditing] = useState(false);
  const [activeCar] = useAtom(userCar);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newEvent = {
      ...data,
      vin: activeCar.VIN,
      type: type,
      documents: [],
      notes: "",
    };
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        event.target.reset();
        setIsEditing(false);
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <StyledHeadline>
        Your {type} {type === "wishlist" ? null : "Appointments"}
      </StyledHeadline>

      <StyledAddButton
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        <SVGIcon variant={isEditing ? "cancel" : "add"} width="40px" />
      </StyledAddButton>
      {isEditing ? (
        <AddEventForm onSubmit={handleSubmit} appointment={{ type: type }} />
      ) : null}
      <EventList type={type} />
    </>
  );
}
