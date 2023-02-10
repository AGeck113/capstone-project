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
// export const users = [
//   {
//     id: 1,
//     car: "WAUZZZ8V9LA015123",
//     name: "User 1",
//     ImageUrl:
//       "https://images.unsplash.com/photo-1585211113085-be26dee0db3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
//   },
//   {
//     id: 2,
//     car: "WAUZZZ8V9LA015123",
//     name: "User 2",
//     ImageUrl:
//       "https://images.unsplash.com/photo-1585211113085-be26dee0db3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
//   },
// ];
export default function HomePage() {
  const { data: session } = useSession();
  console.log(session);
  // const [user, setUser] = useState(users[0]);
  // const { data } = useSWR(`/api/userCars/${user.id}`);
  const { data, error } = useSWR(`/api/userCars/`);
  console.log("DATA", data);

  //new
  const [activeCar, setActiveCar] = useAtom(userCar);

  useEffect(() => {
    if (data) {
      setActiveCar(data);
    }
  }, [data]);

  if (error) {
    return (
      <>
        <h1>No car registrated for your account!</h1>
        <Link href="/createCar/">Create Car</Link>
      </>
    );
  }

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
        <>
          <p>you are not looged in!</p>
          <p>Login here:</p>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </>
  );
}
