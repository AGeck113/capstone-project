import AddEventForm from "@/components/AddEventForm";
import EventList from "@/components/EventList";
import SVGIcon from "@/components/Icons";
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
  const types = ["upcoming", "latest", "wishlist"];
  if (!types.includes(type)) {
    return (
      <>
        <p>Sorry, something went wrong!</p>
        <Link href="/">Back to the Homepage</Link>
      </>
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newEvent = {
      ...data,
      vin: activeCar.VIN,
      type: type,
      documents: [],
      notes: "You can take notes here!",
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
      <Link href="/">Home</Link>
      <h1>
        Your {type} {type === "wishlist" ? null : "Appointments"}
      </h1>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        <SVGIcon variant="add" width="40px" />
      </button>
      {isEditing ? <AddEventForm onSubmit={handleSubmit} /> : null}
      <EventList type={type} />
    </>
  );
}
