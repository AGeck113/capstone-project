import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Details({ appointment }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("notes");
  const [isEditing, setIsEditing] = useState(false);
  console.log(appointment);
  async function handleSubmitNotes(event) {
    event.preventDefault();
    const notes = event.target.elements.notes.value;
    try {
      const response = await fetch(`/api/appointments/${appointment._id}`, {
        method: "PATCH",
        body: JSON.stringify(notes),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        console.log("RESPONSE:", response);
        event.target.reset();
        setIsEditing(false);
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (!appointment) {
    return <p>loading</p>;
  }
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActiveTab("notes");
          setIsEditing(false);
        }}
      >
        Notes
      </button>
      <button
        type="button"
        onClick={() => {
          setActiveTab("documents");
          setIsEditing(false);
        }}
      >
        Documents
      </button>

      <section>
        {activeTab === "notes" ? (
          isEditing === true ? (
            <form onSubmit={handleSubmitNotes}>
              <h2>Notes</h2>
              <label>
                Your Notes:
                <textarea
                  defaultValue={appointment.notes}
                  maxLength={2000}
                  rows={10}
                  name="notes"
                ></textarea>
              </label>
              <button type="submit">Save</button>
            </form>
          ) : (
            <article>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
              <p>{appointment.notes}</p>
            </article>
          )
        ) : null}
      </section>
    </>
  );
}
