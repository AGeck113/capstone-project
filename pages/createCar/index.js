import EditCarForm from "@/components/EditCarForm";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";
import { userCar } from "../index.js";

export default function CreateCar() {
  const [activeCar, setActiveCar] = useAtom(userCar);
  const [searchFailed, setSearchFailed] = useState(false);

  const router = useRouter();

  async function handleSubmitVin(event) {
    event.preventDefault();
    const vin = event.target.elements.vin.value;
    try {
      const response = await fetch(`/api/carDatabase/${vin}`);
      if (response.ok) {
        const carData = await response.json();
        setActiveCar({ ...carData, _id: nanoid(12) });
        try {
          const responsePost = fetch(`api/userCars`, {
            method: "POST",
            body: JSON.stringify(activeCar),
            headers: { "Content-type": "application/json" },
          });
          router.push(`/profile/${vin}`);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error(`Error: ${response.status}`);
        setSearchFailed(true);
      }
    } catch (error) {
      console.error(error);
    }
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
      {searchFailed ? (
        <p>
          Sorry, we can not find the Vin in our data. Please control your vin.
          If you want, you can also use the form to register your car manually.
        </p>
      ) : null}
      <h2>Create your car manually:</h2>
      <EditCarForm onSubmit={handleSubmitForm} form={"create"} />
    </>
  );
}
