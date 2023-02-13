import styled from "styled-components";
import SVGIcon from "../Icons";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useAtom } from "jotai";
import { userCar } from "@/pages";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  color: lightgray;
  align-items: center;
  border-bottom: 2px solid black;
  background-color: hsla(0, 0%, 4%, 1);
  z-index: 10;
  padding: 0 0.6rem;
  max-width: 600px;
`;
const StyledImage = styled(Image)`
  border-radius: 999px;
  border: 3px solid lightgray;
  height: 4rem;
  width: 4rem;
`;
const StyledLogoutButton = styled.button`
  border-radius: 999px;
  width: 4rem;
  background-color: hsla(0, 69%, 60%, 0.9);
`;
const StyledLoginButton = styled.button`
  border-radius: 999px;
  width: 4rem;
  background-color: hsla(103, 100%, 34%, 0.89);
`;
export default function Footer() {
  const { data: session } = useSession();
  const [activeCar] = useAtom(userCar);

  return (
    <>
      {session ? (
        <StyledFooter>
          <section>
            <p>Name: {session.user.name}</p>
            <p>Car: {activeCar ? activeCar.Model : "no car"}</p>
          </section>
          <StyledLogoutButton
            type="button"
            onClick={() => {
              confirm("Do you really want to leave?");
              signOut();
            }}
          >
            <SVGIcon variant="logout" width="40px" />
          </StyledLogoutButton>
          <StyledImage
            src={session.user.image}
            alt={session.user.name}
            width={70}
            height={70}
          />
        </StyledFooter>
      ) : (
        <StyledFooter>
          <p>No user logged in</p>
          <StyledLoginButton
            type="button"
            onClick={() => {
              signIn();
            }}
          >
            <SVGIcon variant="login" width="40px" />
          </StyledLoginButton>
          <SVGIcon variant="user" width="70px" />
        </StyledFooter>
      )}
    </>
  );
}
