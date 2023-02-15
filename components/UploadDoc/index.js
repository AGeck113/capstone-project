import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledForm = styled.form`
  width: 80%;
  background-color: hsla(0, 0%, 4%, 0.64);
  margin: 1rem auto;
  border-radius: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: lightgray;
  grid-column: 1 / 3;
`;
const StyledLabel = styled.label`
  color: lightgray;
  margin: 0.4rem auto;
`;
const StyledUploadButton = styled.button`
  margin: 0.5rem auto;
  grid-column: 1/3;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  background-color: hsla(103, 100%, 34%, 0.89);
`;
export default function UploadDoc({
  onSelectFile,
  setIsEditing,
  onSubmitForm,
}) {
  return (
    <StyledForm
      onSubmit={(event) => {
        onSubmitForm(event);
        setIsEditing(false);
      }}
    >
      <StyledParagraph>Upload Document</StyledParagraph>
      <StyledLabel htmlFor="file">Browse files...</StyledLabel>
      <input
        id="file"
        type="file"
        name="documentFile"
        onChange={onSelectFile}
        required
      />
      <StyledLabel htmlFor="title">Description</StyledLabel>
      <input id="title" type="text" name="title" required />
      <StyledUploadButton type="submit">
        <SVGIcon variant="upload" width="30px" />
      </StyledUploadButton>
    </StyledForm>
  );
}
