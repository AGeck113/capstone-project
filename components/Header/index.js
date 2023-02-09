import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  color: lightgray;
  align-items: center;
  border-bottom: 2px solid black;
  background-color: hsla(0, 0%, 4%, 0.64);
  z-index: 10;
  padding: 0 0.6rem;
`;
const StyledLink = styled(Link)`
  border-radius: 999px;
  border: 3px solid lightgray;
`;
const StyledHeadline = styled.h1`
  font-size: 2.4rem;
`;
export default function Header() {
  return (
    <StyledHeader>
      <StyledLink href="/">
        <SVGIcon variant="home" width="50px" />
      </StyledLink>
      <StyledHeadline>My Car</StyledHeadline>

      <StyledLink href="/profile">
        <SVGIcon variant="car" width="50px" />
      </StyledLink>
    </StyledHeader>
  );
}
