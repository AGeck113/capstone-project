import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledForm = styled.form`
  width: 80%;
  margin: 1rem auto;
  display: grid;
  height: fit-content;
  border-radius: 1rem;
  padding: 1rem;
  color: lightgray;
  background-color: hsla(0, 0%, 4%, 0.64);
  gap: 0.6rem;
`;
const StyledLabel = styled.label`
  width: 100%;
  text-align: center;
  font-weight: bold;
`;
const StyledSubmitButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  margin: 0 auto;
  background-color: hsla(103, 100%, 34%, 0.89);
`;
const StyledInput = styled.input`
  margin: 0.5rem auto;
`;

export default function UploadPicture({ onSubmitPicture, onUploadFile }) {
  return (
    <StyledForm onSubmit={onSubmitPicture}>
      <StyledLabel htmlFor="image">Update your picture! </StyledLabel>
      <StyledInput
        type="file"
        id="image"
        name="imageFile"
        required
        onChange={onUploadFile}
        accept="image/*"
      />

      <StyledSubmitButton type="submit">
        <SVGIcon variant={"upload"} width="30px" />
      </StyledSubmitButton>
    </StyledForm>
  );
}
