import { useRouter } from "next/router";
import styled from "styled-components";
import SVGIcon from "../Icons";
import { signIn, getProviders } from "next-auth/react";
import StyledLink from "../Links/StyledLink";

const StyledParagraph = styled.p`
  color: lightgray;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  fond-weight: bold;
`;
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
  margin: 1rem auto;
  padding: 0.8rem 1rem;
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
export default function Login({ providers }) {
  const router = useRouter();

  function handleSignIn() {
    router.push("/");
    signIn();
  }
  return (
    <>
      <StyledLoginSection>
        <StyledLoginNote>Thank you for visiting My Car</StyledLoginNote>
        <StyledAppDescription>
          You can manage the appointments of your car and keep track of his
          history. You can save appointments or other important things about
          your car, save documents or notes for each of them and get information
          about nice car meetings in your region!
        </StyledAppDescription>
        <StyledSingInButton
          onClick={() => {
            signIn("github");
          }}
        >
          <SVGIcon variant="github" width="40px" />
          <StyledButtonDescription>Sign In with GitHub</StyledButtonDescription>
        </StyledSingInButton>
        <StyledSingInButton
          onClick={() => {
            signIn("google");
          }}
        >
          <SVGIcon variant="google" width="40px" />
          <StyledButtonDescription>Sign In with Google</StyledButtonDescription>
        </StyledSingInButton>
        <StyledLoginNote>
          You can look for events without a login!
        </StyledLoginNote>

        <StyledLink href={`/map`}>
          <SVGIcon variant="map" width="4rem" />
          <StyledParagraph>Events</StyledParagraph>
        </StyledLink>
      </StyledLoginSection>
    </>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
