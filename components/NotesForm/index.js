import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledForm = styled.form`
  position: relative;
  display: grid;
  background-color: hsla(0, 0%, 4%, 0.64);
  width: 80%;
  margin: 1rem auto;
  border-radius: 1rem;
`;
const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: lightgray;
`;
const StyledLabel = styled.label`
  color: lightgray;
  justify-self: start;
`;
const StyledTextarea = styled.textarea`
  width: 80%;
  margin: 0.5rem auto;
  border-radius: 1rem;
  padding: 0.4rem;
  font-size: 0.8rem;
  text-decoration: underline;
  background-color: lightyellow;
`;
const StyledSaveButton = styled.button`
  border-radius: 999px;
  background-color: hsla(103, 100%, 34%, 0.89);
  margin: 0.2rem auto;
  width: 4rem;
  height: 4rem;
  z-index: 10;
`;
export default function NotesForm({ notes, onSubmit, setIsEditing }) {
  return (
    <StyledForm
      onSubmit={(event) => {
        onSubmit(event);
        setIsEditing(false);
      }}
    >
      <StyledParagraph>Notes</StyledParagraph>
      <StyledLabel htmlFor="notes">Your Notes:</StyledLabel>
      <StyledTextarea
        id="notes"
        defaultValue={notes}
        maxLength={2000}
        rows={12}
        name="notes"
      ></StyledTextarea>
      <StyledSaveButton type="submit">
        <SVGIcon variant="save" width="30px" />
      </StyledSaveButton>
    </StyledForm>
  );
}
