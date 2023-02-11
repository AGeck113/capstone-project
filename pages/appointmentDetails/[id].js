import EventCard from "@/components/Event";
import { useRouter } from "next/router";
import useSWR from "swr";
import Details from "../../components/AppointmentDetails";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";

export default function EventDetailPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  const { data, isLoading, mutate } = useSWR(
    id ? `/api/appointments/${id}` : null
  );
  if (!session) {
    return <Login />;
  }

  async function handleSubmitNotes(event) {
    event.preventDefault();
    const notes = event.target.elements.notes.value;
    try {
      const response = await fetch(`/api/appointments/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify(notes),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(`/api/uploadDocument/${data._id}`, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDelete(id) {
    const sure = confirm("Do you really want to delete the document?");
    if (!sure) {
      return;
    }
    try {
      const response = await fetch(`/api/documents/`, {
        method: "PATCH",
        body: id,
      });
      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <>
      <EventCard appointment={data} />
      <Details
        onSubmitNotes={handleSubmitNotes}
        onSubmitForm={handleSubmitForm}
        onDelete={handleDelete}
        appointment={data}
      />
    </>
  );
}
