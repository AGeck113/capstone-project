import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import styled from "styled-components";
import StyledLink from "@/components/Links/StyledLink";
import SVGIcon from "@/components/Icons";
import { signIn, useSession } from "next-auth/react";

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 3px solid darkgray;
  margin: 2rem auto;
  width: 15rem;
  height: 15rem;
  display: flex;
`;
const LinkContainer = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
`;
const StyledParagraph = styled.p`
  color: lightgray;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  fond-weight: bold;
`;
const CreateLink = styled(Link)`
  display: flex;
  width: fit-content;
  height: fit-content;
  background-color: #ccd9ff;
  margin: 1rem auto;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
`;
export const userCar = atomWithStorage("userCar", true, {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

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
export default function HomePage() {
  const { data: session } = useSession();
  const { data } = useSWR(session ? `/api/userCars/` : null);
  const [activeCar, setActiveCar] = useAtom(userCar);

  useEffect(() => {
    if (data) {
      setActiveCar(data);
    }
  }, [data]);

  return (
    <>
      {session ? (
        <>
          <StyledImage
            alt="usercar"
            src={
              activeCar.ImageUrl ||
              "https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg"
            }
            width={200}
            height={200}
          />
          <LinkContainer>
            <StyledLink href={`/events/latest`}>
              <SVGIcon variant="last" width="4rem" />
              <StyledParagraph>latest</StyledParagraph>
            </StyledLink>
            <StyledLink href={`/events/upcoming`}>
              <SVGIcon variant="next" width="4rem" />
              <StyledParagraph>Next</StyledParagraph>
            </StyledLink>
            <StyledLink href={`/events/wishlist`}>
              <SVGIcon variant="wish" width="4rem" />
              <StyledParagraph>Wishes</StyledParagraph>
            </StyledLink>
            <StyledLink href={`/map`}>
              <SVGIcon variant="map" width="4rem" />
              <StyledParagraph>Events</StyledParagraph>
            </StyledLink>
          </LinkContainer>
          <CreateLink href="/createCar">Change car</CreateLink>
        </>
      ) : (
        <StyledLoginSection>
          <StyledLoginNote>Please Login to use the App</StyledLoginNote>
          <StyledAppDescription>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </StyledAppDescription>
          <StyledSingInButton onClick={() => signIn()}>
            <SVGIcon variant="github" width="40px" />
            <StyledButtonDescription>
              Sign In with GitHub
            </StyledButtonDescription>
          </StyledSingInButton>
        </StyledLoginSection>
      )}
    </>
  );
}
