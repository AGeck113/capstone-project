import { nanoid } from "nanoid";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const StyledNotes = styled.p`
  overflow-wrap: break-word;
  background-color: lightyellow;
  height: fit-content;
  width: 80%;
`;
const StyledContainer = styled.article`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
`;

export default function Details({
  appointment,
  onDelete,
  onSubmitForm,
  onSubmitNotes,
}) {
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
            <form
              onSubmit={(event) => {
                onSubmitNotes(event);
                setIsEditing(false);
              }}
            >
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
            <StyledContainer>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit Notes
              </button>
              <StyledNotes>{appointment.notes}</StyledNotes>
            </StyledContainer>
          )
        ) : isEditing === true ? (
          <form
            onSubmit={(event) => {
              onSubmitForm(event);
              setIsEditing(false);
            }}
          >
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
                <li>No Documents found!</li>
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
                        <span aria-label="Delete">❌</span>
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
