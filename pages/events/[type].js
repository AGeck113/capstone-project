import AddEventForm from "@/components/AddEventForm";
import EventList from "@/components/EventList";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { userCar } from "..";

export default function EventsPage() {
  const router = useRouter();
  const { type } = router.query;
  const [isEditing, setIsEditing] = useState(false);
  const [activeCar] = useAtom(userCar);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newEvent = { ...data, vin: activeCar.VIN, type: type };
    console.log(newEvent);
  }
  return (
    <>
      <Link href="/">Home</Link>
      <h1>Your {type} Appointments</h1>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        Add Appointment
      </button>
      {isEditing ? <AddEventForm onSubmit={handleSubmit} /> : null}
      <EventList type={type} />
    </>
  );
}
