import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import AddEventForm from "../AddEventForm";
import SVGIcon from "../Icons";

const EventContainer = styled.article`
  border: 2px solid black;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: hsla(0, 0%, 4%, 0.64);
  border-radius: 2rem;
  position: relative;
  color: lightgray;
  max-width: 300px;
`;
const Title = styled.p`
  width: 90%;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  overflow-wrap: break-word;
`;
const Date = styled.p`
  align-self: flex-start;
  padding-left: 1rem;
`;
const StyledDescription = styled.p`
  overflow-wrap: break-word;
  height: fit-content;
  width: 15rem;
  background-color: hsla(0, 0%, 100%, 0.22);
  border: 3px solid black;
  border-radius: 1rem;
  padding: 1rem 1rem;
`;
const StyledEditButton = styled.button`
  position: absolute;
  top: -1.2rem;
  right: 2.5rem;
  background-color: hsla(34, 93%, 52%, 0.89);
  border-radius: 999px;
`;
const StyledDeleteButton = styled.button`
  position: absolute;
  top: -1.2rem;
  right: -0.4rem;
  background-color: hsla(0, 93%, 40%, 0.89);
  border-radius: 999px;
`;
const StyledLink = styled(Link)`
  background-color: lightgray;
  padding: 0.5rem 0.5rem;
  height: 2rem;
  border: 2px solid black;
  border-radius: 1rem;
  margin: 0.5 auto;
`;

export default function EventCard({ appointment }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  async function handleDelete() {
    const sure = confirm("Do you really want to delete the document?");
    if (!sure) {
      return;
    }
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
      <StyledEditButton
        type="button"
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        <SVGIcon variant="edit" width="30px" />
      </StyledEditButton>
      <StyledDeleteButton type="button" onClick={handleDelete}>
        <SVGIcon variant="delete" width="30px" />
      </StyledDeleteButton>
      {isEditing ? (
        <AddEventForm onSubmit={handleSubmit} appointment={appointment} />
      ) : appointment ? (
        <>
          <Title>{appointment.title}</Title>
          <Date>Date: {appointment.date}</Date>
          <StyledDescription>{appointment.description}</StyledDescription>
          <p>
            Cost:{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(appointment.cost)}
          </p>
          <p>Priority: {appointment.priority}</p>
          <StyledLink href={`/appointmentDetails/${appointment._id}`}>
            <SVGIcon variant="information" width="30px" />
          </StyledLink>
        </>
      ) : null}
    </EventContainer>
  );
}
