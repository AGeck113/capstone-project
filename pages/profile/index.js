import EditCarForm from "@/components/EditCarForm";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";
import { initialCars } from "../index.js";

export default function CreateCar() {
  const [searchFailed, setSearchFailed] = useState(false);
  const [cars, setCars] = useAtom(initialCars);
  console.log(cars);

  const router = useRouter();

  function handleSubmitVin(event) {
    event.preventDefault();
    const vin = event.target.elements.vin.value;
    const foundCar = cars.some((car) => {
      return car.VIN === vin;
    });
    if (foundCar === true) {
      router.push(`/profile/${vin}`);
    }
    {
      setSearchFailed(true);
    }
  }
  function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newCar = { VIN: nanoid(), ...data };

    setCars([...cars, newCar]);
    router.push(`/profile/${newCar.VIN}`);
  }
  if (!cars) {
    return <p>loading</p>;
  }
  return (
    <>
      <h1>Register your car!</h1>
      <form onSubmit={handleSubmitVin}>
        <label>
          Search your car with your VIN:
          <input type="text" minLength={17} maxLength={17} name="vin"></input>
        </label>
        <button type="submit">Search!</button>
      </form>
      {searchFailed ? (
        <p>
          Sorry, we can't find the Vin in our data. Please control your vin. If
          you want, you can also use the form to register your car manualy.
        </p>
      ) : null}
      <h2>Create your car manualy:</h2>
      <EditCarForm onSubmit={handleSubmitForm} form={"create"} />
    </>
  );
}
