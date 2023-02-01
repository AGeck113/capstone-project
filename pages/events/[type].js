import EventList from "@/components/EventList";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EventsPage() {
  const router = useRouter();
  const { type } = router.query;
  const [isEditing, setIsEditing] = useState(false);

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
      {isEditing ? <p></p> : null}
      <EventList type={type} />
    </>
  );
}
