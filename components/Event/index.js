import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import AddEventForm from "../AddEventForm";

const EventContainer = styled.article`
  border: 2px solid black;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ccd9ff;
  border-radius: 2rem;
`;
const Title = styled.p`
  width: 80%;
  text-align: center;
  margin-bottom 0.4rem;
  font-weight: bold;
  font-size: 1.2rem;
  overflow-wrap: break-word;

`;
const Date = styled.p`
  align-self: flex-start;
  padding-left: 1rem;
`;
const Description = styled.p`
  overflow-wrap: break-word;
  background-color: lightgray;
  height: fit-content;
  width: 15rem;
`;

export default function EventCard({ appointment }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  async function handleDelete() {
    try {
      const response = await fetch(`/api/appointments/${appointment._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.reload();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const updatedEvent = {
      ...data,
      vin: appointment.vin,
    };
    try {
      const response = await fetch(`/api/appointments/${appointment._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedEvent),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        event.target.reset();
        router.reload();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <EventContainer>
      <button
        type="button"
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        Edit
      </button>
      {isEditing ? (
        <>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <AddEventForm onSubmit={handleSubmit} appointment={appointment} />
        </>
      ) : appointment ? (
        <>
          <Title>{appointment.title}</Title>
          <Date>Date: {appointment.date}</Date>
          <Description>{appointment.description}</Description>
          <p>
            Cost:{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(appointment.cost)}
          </p>
          <p>Priority: {appointment.priority}</p>
        </>
      ) : null}
    </EventContainer>
  );
}
