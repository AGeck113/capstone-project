import { nanoid } from "nanoid";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledNotes = styled.p`
  overflow-wrap: break-word;
  background-color: lightyellow;
  height: fit-content;
  width: 70%;
  border-radius: 1rem;
  padding: 0.5rem;
  text-decoration: underline;
`;
const StyledContainer = styled.section`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
`;
const ButtonContainer = styled.section`
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
`;
const StyledTabButton = styled.button`
  border-radius: 999px;
  height: 3rem;
  width: 3rem;
  background-color: hsla(0, 0%, 4%, 0.64);
`;
const DocumentContainer = styled.section`
  background-color: hsla(0, 0%, 4%, 0.64);
  width: 80%;
  margin: 1rem auto;
  border-radius: 1rem;
  padding: 1rem;
  display: grid;
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
      <ButtonContainer>
        <StyledTabButton
          type="button"
          onClick={() => {
            setActiveTab("notes");
            setIsEditing(false);
          }}
        >
          <SVGIcon variant="notes" width="30px" />
        </StyledTabButton>
        <StyledTabButton
          type="button"
          onClick={() => {
            setActiveTab("documents");
            setIsEditing(false);
          }}
        >
          <SVGIcon variant="documents" width="30px" />
        </StyledTabButton>
      </ButtonContainer>
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
              <StyledNotes>{appointment.notes}</StyledNotes>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit Notes
              </button>
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
            {appointment.documents.length === 0 ? (
              <ul>
                <li>No Documents found!</li>{" "}
              </ul>
            ) : (
              <DocumentContainer>
                <ul>
                  {appointment.documents.map((document) => {
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
                  })}
                </ul>
              </DocumentContainer>
            )}
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
