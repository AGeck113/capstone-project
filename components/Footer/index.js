import Link from "next/link";
import styled from "styled-components";
import SVGIcon from "../Icons";

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: lightgray;
  align-items: center;
  position: fixed;
  bottom: 0px;
  border-bottom: 2px solid black;
  background-color: hsla(0, 0%, 4%, 0.94);
  z-index: 10;
  padding: 0 0.6rem;
  height: 5rem;
  max-width: 600px;
`;
const StyledLink = styled(Link)`
  border-radius: 999px;
  border: 3px solid lightgray;
`;
const StyledHeadline = styled.h1`
  font-size: 2rem;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink href="/">
        <SVGIcon variant="home" width="50px" />
      </StyledLink>
      <StyledHeadline>My Car</StyledHeadline>

      <StyledLink href="/profile">
        <SVGIcon variant="car" width="50px" />
      </StyledLink>
    </StyledFooter>
  );
}
