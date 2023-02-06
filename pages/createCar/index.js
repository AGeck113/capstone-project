import EditCarForm from "@/components/EditCarForm";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import Link from "next/link.js";
import { useRouter } from "next/router";
import { useState } from "react";
import { userCar, users } from "../index.js";

const carPrototype = {
  VIN: "",
  Make: "",
  Model: "",
  Milage: 0,
  Plate: "",
  ImageUrl: null,
  "Length (mm)": 0,
  "Height (mm)": 0,
  "Width (mm)": 0,
  "Width including mirrors (mm)": 0,
  "Weight Empty (kg)": 0,
  "Max Weight (kg)": 0,
  Drive: "",
  "Model Year": 0,
  "Engine Displacement (ccm)": 0,
  Transmission: "",
  "Number Of Gears": 0,
};

export default function CreateCar() {
  const [activeCar, setActiveCar] = useAtom(userCar);
  const [searchFailed, setSearchFailed] = useState(false);
  const [user, setUser] = useState(users[0]);
  const router = useRouter();

  async function handleSubmitVin(event) {
    event.preventDefault();
    const vin = event.target.elements.vin.value;
    try {
      const response = await fetch(`/api/carDatabase/${vin}`);
      if (response.ok) {
        const carData = await response.json();
        try {
          const newCar = {
            ...carPrototype,
            ...carData,
            UserId: user.id,
          };
          const { _id, ...newCarPut } = newCar;
          const responsePost = await fetch(`api/userCars/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(newCarPut),
            headers: { "Content-type": "application/json" },
          });
          setUser({ ...user, car: vin });
          const responseCar = await responsePost.json();
          setActiveCar(responseCar);
          router.push("/profile");
        } catch (error) {
          console.error(error);
        }
      }
      setSearchFailed(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    let imageUrl;
    if (data.imageUrl) {
      const response = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      imageUrl = await response.json();
    }

    const newCar = {
      ...carPrototype,
      ...data,
      UserId: user.id,
      ImageUrl: imageUrl,
    };
    try {
      const response = await fetch(`api/userCars/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(newCar),
        headers: { "Content-type": "application/json" },
      });
      setUser({ ...user, car: data.VIN });
      const responseCar = await response.json();
      setActiveCar(responseCar);
      router.push(`/profile/`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/profile">Details</Link>
      <h1>Register your car!</h1>
      <form onSubmit={handleSubmitVin}>
        <label>
          Search your car with your VIN:
          <input type="text" minLength={17} maxLength={17} name="vin"></input>
        </label>
        <button type="submit">Add!</button>
        <p>
          Working VINs right now: LRW3E7EL3NC123456,
          WAUZZZ8V9LA015123,W0L0SDL08D0294820 and VF1CN041547024123
        </p>
      </form>
      {searchFailed ? (
        <p>
          Sorry, we can not find the Vin in our data. Please control your vin.
          If you want, you can also use the form to register your car manually.
        </p>
      ) : null}
      <h2>Create your car manually:</h2>
      <EditCarForm
        onSubmit={handleSubmitForm}
        activeCar={activeCar}
        form={"create"}
      />
    </>
  );
}
