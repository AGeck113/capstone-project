import Image from "next/image";
import styled from "styled-components";

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 3px solid darkgray;
  margin: 2rem auto;
  width: 12rem;
  height: 12rem;
  display: flex;
`;
export default StyledImage;
