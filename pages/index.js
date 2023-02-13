import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import useSWR from "swr";
import { useEffect } from "react";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import styled from "styled-components";

import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import NoCarMessage from "@/components/NoCarMessage";

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 3px solid darkgray;
  margin: 2rem auto;
  width: 15rem;
  height: 15rem;
  display: flex;
`;

export const userCar = atomWithStorage("userCar", true, {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export default function HomePage() {
  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR(session ? `/api/userCars/` : null, {
    shouldRetryOnError: false,
  });

  const [activeCar, setActiveCar] = useAtom(userCar);
  useEffect(() => {
    if (data) {
      setActiveCar(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>loading</p>;
  }
  if (error) {
    return <NoCarMessage />;
  }
  if (!session) {
    return (
      <>
        <Login />
      </>
    );
  }

  return (
    <>
      <>
        <Link href="/profile">
          <StyledImage
            priority
            alt="usercar"
            src={activeCar.ImageUrl || "/placeholder-image-1.jpeg"}
            width={200}
            height={200}
          />
        </Link>
      </>
    </>
  );
}
