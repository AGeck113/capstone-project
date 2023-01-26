import Link from "next/link";
import Image from "next/image";
import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import useSWR from "swr";
import { useEffect, useState } from "react";

export const userCar = atom();
export const users = {
  id: 1,
  car: "WAUZZZ8V9LA015917",
  name: "User 1",
  ImageUrl:
    "https://images.unsplash.com/photo-1585211113085-be26dee0db3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
};
export default function HomePage() {
  const [user, setUser] = useState(users);
  const { data } = useSWR(`/api/userCars/${user.id}`);
  const [activeCar, setActiveCar] = useAtom(userCar);

  useEffect(() => {
    if (data) {
      setActiveCar(data);
    }
  }, [data]);

  if (!data) {
    return <p>loading</p>;
  }

  return (
    <>
      <h1>My Car</h1>

      <Link href={`/profile/`}>
        <Image
          alt="usercar"
          src={
            user.ImageUrl ||
            "https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg"
          }
          width={200}
          height={200}
        />
      </Link>

      <Link href="/profile/">Test Detail Page </Link>
      <Link href="/createCar">Change car</Link>
    </>
  );
}
