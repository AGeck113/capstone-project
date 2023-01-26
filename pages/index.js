import Link from "next/link";
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import useSWR from "swr";
import { useEffect } from "react";

export const userCar = atom();
const user = { id: nanoid(), car: "WAUZZZ8V9LA015917", name: "Andreas" };

export default function HomePage() {
  const { data } = useSWR(`/api/userCars/${user.car}`);
  const [activeCar, setActiveCar] = useAtom(userCar);

  useEffect(() => {
    if (data) {
      setActiveCar(...data);
    }
  }, [data]);

  if (!data) {
    return <p>loading</p>;
  }

  return (
    <>
      <h1>My Car</h1>

      <Link href={`/profile/WAUZZZ8V9LA015917`}>
        <Image
          alt="usercar"
          src="https://images.unsplash.com/photo-1579631962852-306c90e1c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
          width={200}
          height={200}
        />
      </Link>

      <Link href="/profile/W0L0SDL08D0294820">Test Detail Page </Link>
      <Link href="/createCar">Create car</Link>
    </>
  );
}
