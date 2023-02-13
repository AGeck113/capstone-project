import styled from "styled-components";
import SVGIcon from "../Icons";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useAtom } from "jotai";
import { userCar } from "@/pages";
import Link from "next/link";

const StyledHeader = styled.header`
  // position: fixed;
  // top: 0;

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
export default function Header() {
  const { data: session } = useSession();
  const [activeCar] = useAtom(userCar);

  return (
    <>
      {session ? (
        <StyledHeader>
          <section>
            <p>Name: {session.user.name}</p>
            <p>Car: {activeCar ? activeCar.Model : "no car"}</p>
          </section>
          <Link href="/profile">
            <StyledImage
              src={session.user.image}
              alt={session.user.name}
              width={70}
              height={70}
            />
          </Link>
          <StyledLogoutButton
            type="button"
            onClick={() => {
              confirm("Do you really want to leave?");
              signOut();
            }}
          >
            <SVGIcon variant="logout" width="40px" />
          </StyledLogoutButton>
        </StyledHeader>
      ) : (
        <StyledHeader>
          <p>No user logged in</p> <SVGIcon variant="user" width="70px" />
          <StyledLoginButton
            type="button"
            onClick={() => {
              signIn();
            }}
          >
            <SVGIcon variant="login" width="40px" />
          </StyledLoginButton>
        </StyledHeader>
      )}
    </>
  );
}
