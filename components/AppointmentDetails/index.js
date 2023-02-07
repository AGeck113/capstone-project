import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Details({
  appointment,
  onDelete,
  onSubmitForm,
  onSubmitNotes,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("notes");
  const [isEditing, setIsEditing] = useState(false);

  if (!appointment) {
    return <p>loading</p>;
  }
  function handleSelectFile(event) {
    event.preventDefault();
    if (event.target.files[0].size > 10485760) {
      alert("Your picture is too big, Max 10 MB!");
    }
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
            <form onSubmit={onSubmitNotes}>
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
                Edit Notes
              </button>
              <p>{appointment.notes}</p>
            </article>
          )
        ) : isEditing === true ? (
          <form onSubmit={onSubmitForm}>
            <label>
              Upload Document
              <input
                type="file"
                name="documentFile"
                onChange={handleSelectFile}
                required
              />
            </label>
            <label>
              Name:
              <input type="text" name="title" required />
            </label>
            <button type="submit">save</button>
          </form>
        ) : (
          <>
            <ul>
              {appointment.documents.length === 0 ? (
                <p>No Documents found!</p>
              ) : (
                appointment.documents.map((document) => {
                  return (
                    <li key={nanoid()}>
                      <Link href={document.url}>{document.title}</Link>
                      <button
                        type="button"
                        onClick={() => {
                          onDelete(document._id);
                        }}
                      >
                        <span aria-label="Delete"> ❌</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Save new File
            </button>
          </>
        )}
      </section>
    </>
  );
}
