import { useState } from "react";
import styled from "styled-components";
import Documents from "../Documents";
import SVGIcon from "../Icons";
import NotesForm from "../NotesForm";
import UploadDoc from "../UploadDoc";

const StyledAddButton = styled.button`
  border-radius: 999px;
  background-color: hsla(103, 100%, 34%, 0.89);
  width: 4rem;
  height: 4rem;
  margin 1rem auto;
`;

const StyledNotes = styled.textarea`
  overflow-wrap: break-word;
  background-color: lightyellow;
  height: fit-content;
  width: 90%;
  border-radius: 1rem;
  padding: 0.5rem;
  text-decoration: underline;
  margin: 0.5rem auto;
`;
const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: lightgray;
`;
const StyledContainer = styled.section`
  position: relative;
  display: grid;
  background-color: hsla(0, 0%, 4%, 0.64);
  width: 80%;
  margin: 1rem auto;
  border-radius: 1rem;
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
const DocumentContainer = styled.ul`
  background-color: hsla(0, 0%, 4%, 0.64);
  width: 80%;
  margin: 1rem auto;
  border-radius: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
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
      {activeTab === "notes" ? (
        isEditing === true ? (
          <>
            <NotesForm
              notes={appointment.notes}
              onSubmit={onSubmitNotes}
              setIsEditing={setIsEditing}
            />
          </>
        ) : (
          <StyledContainer>
            <StyledParagraph>Notes</StyledParagraph>

            <StyledNotes
              disabled
              maxLength={2000}
              rows={12}
              value={appointment.notes}
            />

            <StyledAddButton
              type="button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <SVGIcon variant="edit" width="30px" />
            </StyledAddButton>
          </StyledContainer>
        )
      ) : isEditing === true ? (
        <UploadDoc
          onSelectFile={handleSelectFile}
          setIsEditing={setIsEditing}
          onSubmitForm={onSubmitForm}
        />
      ) : (
        <>
          {appointment.documents.length === 0 ? (
            <ul>
              <li>No Documents found!</li>
              <StyledAddButton
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <SVGIcon variant={isEditing ? "cancel" : "add"} width="40px" />
              </StyledAddButton>
            </ul>
          ) : (
            <DocumentContainer>
              <Documents
                documents={appointment.documents}
                onDelete={onDelete}
              />
              <StyledAddButton
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <SVGIcon variant={isEditing ? "cancel" : "add"} width="40px" />
              </StyledAddButton>
            </DocumentContainer>
          )}
        </>
      )}
    </>
  );
}
