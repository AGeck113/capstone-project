import Link from "next/link";
import styled from "styled-components";

const StyledNoteSection = styled.section`
  border: 2px solid black;
  margin: 5rem auto;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: hsla(0, 0%, 4%, 0.64);
  border-radius: 1rem;
  color: lightgray;
  max-width: 300px;
`;

const StyledCreateLink = styled(Link)`
  margin: auto;
  font-size: 3rem;
  color: lightgray;
`;
const StyledParagraph = styled.p`
  color: lightgray;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  fond-weight: bold;
`;
export default function NoCarMessage() {
  return (
    <>
      <StyledNoteSection>
        <StyledParagraph>No registrated car!</StyledParagraph>
        <StyledCreateLink href="createCar">Create a Car!</StyledCreateLink>
      </StyledNoteSection>
    </>
  );
}
