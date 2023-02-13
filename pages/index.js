import Link from "next/link";
import { useAtom } from "jotai";
import useSWR from "swr";
import { useEffect } from "react";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import NoCarMessage from "@/components/NoCarMessage";
import LinkSection from "@/components/LinkContainer/Index";
import StyledImage from "@/components/StyledImage";

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
        <LinkSection />
      </>
    </>
  );
}
