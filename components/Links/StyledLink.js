import Link from "next/link";
import styled, { css } from "styled-components";

const StyledLink = styled(Link)`
  height: 6rem;
  width: 75%;
  background-color: hsla(0, 0%, 4%, 0.64);
  margin: 1rem auto;
  border-radius: 1rem;
  border: 1px solid black;
  text-align: center;
  text-decoration: none;
`;
export default StyledLink;
