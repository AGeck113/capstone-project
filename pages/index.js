import Link from "next/link";
import Image from "next/image";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useAtom } from "jotai";
import carDatabase from "../db/db.json";
import { nanoid } from "nanoid";
import useSWR from "swr";

const users = [
  { id: nanoid(), car: "WAUZZZ8V9LA015917", name: "Andreas" },
  { id: nanoid(), car: "W0L0SDL08D0294820", name: "Mario" },
];

export const initialCar = atomWithStorage("initialCar", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});
export const initialCars = atomWithStorage("initialCars", carDatabase, {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});
export default function HomePage() {
  const { data } = useSWR(`/api/carDatabase/WAUZZZ8V9LA015917`);
  const [activeCar, setActiveCar] = useAtom(initialCar);
  if (!data) {
    return <h1>Loading...</h1>;
  }
  console.log(data);
  if (!initialCar) {
    return <p>...loading</p>;
  }
  return (
    <>
      <h1>Car App</h1>

      <Link href={`/profile/WAUZZZ8V9LA015917`}>
        <Image
          alt="usercar"
          src="https://images.unsplash.com/photo-1579631962852-306c90e1c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
          width={200}
          height={200}
        />
      </Link>

      <Link href="/profile/W0L0SDL08D0294820">Test Detail Page </Link>
      <Link href="/profile">Create car</Link>
    </>
  );
}
