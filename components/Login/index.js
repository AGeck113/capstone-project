import { useRouter } from "next/router";
import styled from "styled-components";
import SVGIcon from "../Icons";
import { signIn } from "next-auth/react";
const StyledLoginNote = styled.h2`
  text-align: center;
  padding: 1rem auto;
`;
const StyledAppDescription = styled.p`
  overflow-wrap: break-word;
  height: fit-content;
  width: 15rem;
  background-color: hsla(0, 0%, 100%, 0.22);
  border: 3px solid black;
  border-radius: 1rem;
  padding: 1rem 1rem;
`;
const StyledSingInButton = styled.button`
  width: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: hsla(108, 89%, 33%, 0.87);
  border-radius: 1rem;
  padding: 0.5rem;
`;
const StyledLoginSection = styled.section`
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
const StyledButtonDescription = styled.p`
  color: lightgray;
  font-size: 1.1rem;
  font-weight: bold;
`;
export default function Login() {
  const router = useRouter();

  function handleSignIn() {
    router.push("/");
    signIn();
  }
  return (
    <>
      <StyledLoginSection>
        <StyledLoginNote>Please Login to use the App</StyledLoginNote>
        <StyledAppDescription>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </StyledAppDescription>
        <StyledSingInButton onClick={handleSignIn}>
          <SVGIcon variant="github" width="40px" />
          <StyledButtonDescription>Sign In with GitHub</StyledButtonDescription>
        </StyledSingInButton>
      </StyledLoginSection>
    </>
  );
}
