import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledDocument = styled.li`
  border: 3px solid black;
  height: 5rem;
  width: 5rem;
  margin: 0.5rem auto;
  background-color: hsla(0, 0%, 100%, 0.22);
  border-radius: 1rem;
  position: relative;
`;
const StyledLink = styled(Link)`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;
const StyledDocumentName = styled.p`
  text-align: center;
  margin: 0 auto;
  color: lightgray;
`;
const StyledDeleteButton = styled.button`
  position: absolute;
  z-index: 10;
  right: -1.2rem;
  background-color: hsla(0, 93%, 40%, 0.89);
  border-radius: 999px;
`;
export default function Documents({ documents, onDelete }) {
  return documents.map((document) => {
    return (
      <StyledDocument key={document._id}>
        <StyledDeleteButton
          type="button"
          onClick={() => {
            onDelete(document._id);
          }}
        >
          <SVGIcon variant="delete" width="20px" />
        </StyledDeleteButton>
        <StyledLink href={document.url}>
          <SVGIcon variant="documents" width="50px" />
        </StyledLink>
        <StyledDocumentName>{document.title}</StyledDocumentName>
      </StyledDocument>
    );
  });
}
