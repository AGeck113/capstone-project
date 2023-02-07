import { nanoid } from "nanoid";
import { useState } from "react";

export default function Details({ appointment }) {
  const [activeTab, setActiveTab] = useState("notes");
  const [isEditing, setIsEditing] = useState(false);
  console.log(appointment);
  function handleSubmit(event) {
    event.preventDefault();
    setIsEditing(false);
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
            <form onSubmit={handleSubmit}>
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
            </article>
          )
        ) : null}
      </section>
    </>
  );
}
