import Link from "next/link";
import styled, { css } from "styled-components";

const StyledLink = styled(Link)`
  height: 7rem;
  width: 80%;
  background-color: hsla(0, 0%, 4%, 0.64);
  margin: 1rem auto;

  border-radius: 20%;
  border: 1px solid black;
  text-align: center;
  text-decoration: none;
`;
export default StyledLink;
