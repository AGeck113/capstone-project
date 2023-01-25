import EditCarForm from "@/components/EditCarForm";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";
import { userCar } from "../index.js";
import useSWR from "swr";

export default function CreateCar() {
  const [activeCar, setActiveCar] = useAtom(userCar);
  //   console.log(cars);

  const router = useRouter();

  function handleSubmitVin(event) {
    event.preventDefault();
    const vin = event.target.elements.vin.value;

    router.push(`/profile/${vin}`);
  }
  function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newCar = { VIN: nanoid(), ...data };
    try {
      const response = fetch(`api/userCar/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      });
      console.log(newCar);
      setActiveCar(newCar);
      router.push(`/profile/${newCar.VIN}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Register your car!</h1>
      <form onSubmit={handleSubmitVin}>
        <label>
          Search your car with your VIN:
          <input type="text" minLength={17} maxLength={17} name="vin"></input>
        </label>
        <button type="submit">Add!</button>
      </form>

      <h2>Create your car manually:</h2>
      <EditCarForm onSubmit={handleSubmitForm} form={"create"} />
    </>
  );
}
