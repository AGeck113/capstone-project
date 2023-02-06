import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import styled from "styled-components";
const StyledH1 = styled.h1`
  text-align: center;
  padding: auto;
  height: 3rem;
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
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
const StyledLink = styled(Link)`
  height: 7rem;
  width: 90%;
  background-color: #ccd9ff;
  margin: 1rem auto;
  padding-top: 3rem;
  border-radius: 2rem;
  text-align: center;
`;

const CreateLink = styled(Link)`
  display: flex;
  width: fit-content;
  height: 3rem;
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
export const users = [
  {
    id: 1,
    car: "WAUZZZ8V9LA015123",
    name: "User 1",
    ImageUrl:
      "https://images.unsplash.com/photo-1585211113085-be26dee0db3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    id: 2,
    car: "WAUZZZ8V9LA015123",
    name: "User 1",
    ImageUrl:
      "https://images.unsplash.com/photo-1585211113085-be26dee0db3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];
export default function HomePage() {
  const [user, setUser] = useState(users[0]);
  const { data } = useSWR(`/api/userCars/${user.id}`);
  const [activeCar, setActiveCar] = useAtom(userCar);

  useEffect(() => {
    if (data) {
      setActiveCar(data);
    }
  }, [data]);

  return (
    <>
      <StyledH1>My Car</StyledH1>

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
        <StyledLink href="/profile/">Profile</StyledLink>
        <StyledLink href={`/events/upcoming`}>Upcoming Appointments</StyledLink>
        <StyledLink href={`/events/latest`}>Latest Appointments</StyledLink>
        <StyledLink href={`/events/wishlist`}>Your Wishlist</StyledLink>
      </LinkContainer>
      <CreateLink href="/createCar">Change car</CreateLink>
    </>
  );
}
