import { useRouter } from "next/router";
import { useState } from "react";
import initialCars from "../../db/db.json";

export default function CreateCar() {
  const [searchFailed, setSearchFailed] = useState(false);
  const router = useRouter();
  function handleSubmitVin(event) {
    event.preventDefault();
    const vin = event.target.elements.vin.value;
    console.log(vin);
    const foundCar = initialCars.some((car) => {
      return car.VIN === vin;
    });
    if (foundCar === true) {
      router.push(`/profile/${vin}`);
    }
    {
      setSearchFailed(true);
    }
  }

  //   const selectedCar = cars.find((car) => {
  //     return car.VIN === vin;
  //   });

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
          you want, you can also use the form to register your car manually.
        </p>
      ) : null}
    </>
  );
}
