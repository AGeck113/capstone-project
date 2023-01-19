import CarDetails from "@/components/CarDetails";
import EditCarForm from "@/components/EditCarForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  // TEST
  const decodeObject = {};
  const decodeArray = [
    {
      label: "VIN",
      value: "W0L0SDL08D0294820",
    },
    {
      label: "Vehicle ID",
      value: 3761,
    },
    {
      label: "Make",
      value: "Opel",
      id: 121,
    },
    {
      label: "Model",
      value: "Corsa",
      id: 17598,
    },
    {
      label: "Model Year",
      value: 2013,
    },
    {
      label: "Product Type",
      value: "Car",
      id: 4,
    },
    {
      label: "Body",
      value: "Hatchback/Liftback/Notchback",
      id: 5,
    },
    {
      label: "Series",
      value: "D (2006-2014)",
    },
    {
      label: "Drive",
      value: "Front-wheel drive",
      id: 1,
    },
    {
      label: "Engine Displacement (ccm)",
      value: 1229,
    },
    {
      label: "Fuel Type - Primary",
      value: "Gasoline",
      id: 8,
    },
    {
      label: "Transmission",
      value: "Manual/Standard",
      id: 6,
    },
    {
      label: "Number of Gears",
      value: 5,
    },
    {
      label: "Manufacturer",
      value: "ADAM OPEL AG, D-65423 R\u00fcsselsheim am Main",
    },
    {
      label: "Manufacturer Address",
      value: "Bahnhofsplatz, 65423 Ruesselsheim, Germany",
    },
    {
      label: "Plant Country",
      value: "Germany",
    },
    {
      label: "Production Started",
      value: 2011,
    },
    {
      label: "Production Stopped",
      value: 2014,
    },
    {
      label: "Engine Manufacturer",
      value: "GMPTE",
    },
    {
      label: "Engine Type",
      value: "4-Stroke / 4 / Row-Inj",
    },
    {
      label: "Fuel Consumption Combined (l/100km)",
      value: 5.1,
    },
    {
      label: "Fuel Consumption Extra Urban (l/100km)",
      value: 4.3,
    },
    {
      label: "Fuel Consumption Urban (l/100km)",
      value: 6.4,
    },
    {
      label: "Average CO2 Emission (g/km)",
      value: 127.37,
    },
    {
      label: "Number Wheels",
      value: 4,
    },
    {
      label: "Number of Axles",
      value: 2,
    },
    {
      label: "Number of Seats",
      value: "5",
    },
    {
      label: "Front Brakes",
      value: "Disc",
    },
    {
      label: "Rear Brakes",
      value: "Drum",
    },
    {
      label: "Brake System",
      value: "Hydraulic",
    },
    {
      label: "Suspension",
      value: "Silencer/Screws",
    },
    {
      label: "Steering Type",
      value: "Electric steering",
    },
    {
      label: "Drag Coefficient",
      value: 0.32,
    },
    {
      label: "Wheel Size",
      value: "185/70 R14 88T",
    },
    {
      label: "Wheel Size Array",
      value: ["185/70 R14 88T"],
    },
    {
      label: "Wheelbase (mm)",
      value: 2511,
    },
    {
      label: "Wheelbase Array (mm)",
      value: [2511],
    },
    {
      label: "Height (mm)",
      value: 1488,
    },
    {
      label: "Length (mm)",
      value: 3999,
    },
    {
      label: "Width (mm)",
      value: 1713,
    },
    {
      label: "Width including mirrors (mm)",
      value: 1944,
    },
    {
      label: "Rear Overhang (mm)",
      value: 648,
    },
    {
      label: "Track Front (mm)",
      value: 1485,
    },
    {
      label: "Track Rear (mm)",
      value: 1478,
    },
    {
      label: "Max Speed (km/h)",
      value: 155,
    },
    {
      label: "Weight Empty (kg)",
      value: 1100,
    },
    {
      label: "Max Weight (kg)",
      value: 1565,
    },
    {
      label: "Max roof load (kg)",
      value: 75,
    },
    {
      label: "Air Conditioning",
      value: "A/C (man.)",
    },
    {
      label: "ABS",
      value: 1,
    },
    {
      label: "Check Digit",
      value: "8",
    },
    {
      label: "Sequential Number",
      value: "294820",
    },
  ];
  decodeArray.forEach((item) => {
    decodeObject[item.label] = item.value;
  });
  const testCar = [decodeObject];
  console.log(testCar);
  //TEST
  const [activeCar, setActiveCar] = useState();
  const [carResponse, setCarResponse] = useState();
  const [vin, setVin] = useState();
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmitVIN(event) {
    event.preventDefault();
    setVin(event.target.elements.vin.value);
    console.log(vin);
    setCarResponse(
      testCar.find((car) => {
        return car.vin === vin;
      })
    );
  }
  function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setActiveCar(data);
    console.log("searched car edited:", activeCar);
    setCarResponse();
    router.push("/profile");
  }

  return (
    <>
      <Link href="/">Back</Link>
      {activeCar ? (
        <>
          <CarDetails activeCar={activeCar} />
        </>
      ) : (
        <form
          onSubmit={(event) => {
            handleSubmitVIN(event);
          }}
        >
          <label htmlFor="vin">
            Please enter your VIN:<br></br>
            <input
              name="vin"
              id="vin"
              type="text"
              minLength={17}
              maxLength={17}
            ></input>
          </label>
          <button type="submit"> Search</button>
        </form>
      )}
      {carResponse ? (
        <EditCarForm
          carResponse={carResponse}
          onSubmit={(event) => {
            handleSubmitForm(event);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}
