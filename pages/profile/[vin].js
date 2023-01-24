import EditCarForm from "@/components/EditCarForm";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import initialCars from "../../db/db.json";

export default function CarDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { vin } = router.query;

  const [cars, setCars] = useState(initialCars);
  const groups = [
    {
      id: 1,
      headline: "Important data",
      content: ["Make", "Model", "Milage", "Plate", "ImageUrl"],
    },
    {
      id: 2,
      headline: "Dimensions",
      content: [
        "Length (mm)",
        "Height (mm)",
        "Width (mm)",
        "Width including mirrors (mm)",
        "Height (mm)",
        "Weight Empty (kg)",
        "Max Weight (kg)",
      ],
    },
    {
      id: 3,
      headline: "More Information",
      content: [
        "Drive",
        "Model Year",
        "Engine Displacement (ccm)",
        "Transmission",
        "Number Of Gears",
      ],
    },
  ];

  const selectedCar = cars.find((car) => {
    return car.VIN === vin;
  });

  const activeCar = { Milage: 0, Plate: "", imageUrl: "", ...selectedCar };

  if (!activeCar) {
    return <p>loading...</p>;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setCars(
      cars.map((car) => (activeCar.VIN === car.VIN ? { ...car, ...data } : car))
    );
    setIsEditing(false);
  }

  if (!activeCar) {
    return <p>loading...</p>;
  }

  return (
    <>
      {isEditing ? (
        <EditCarForm
          activeCar={activeCar}
          onSubmit={handleSubmit}
          groups={groups}
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit Car Data
          </button>
          <Image
            alt="usercar"
            src={
              activeCar.imageUrl ||
              "https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg"
            }
            width={200}
            height={200}
          />
          <h1>Mein Auto:</h1>
          <section>
            <p>Wichtige Daten:</p>
            <ul>
              <li>Marke: {activeCar.Make}</li>
              <li>Modell: {activeCar.Model}</li>
              <li>KM-Stand: {activeCar.Milage}</li>
              <li>Kennzeichen: {activeCar.Plate}</li>
            </ul>
          </section>
          <section>
            <p>Maße:</p>
            <ul>
              <li>Länge: {activeCar["Length (mm)"]}(mm)</li>
              <li>Breite: {activeCar["Width (mm)"]}(mm)</li>
              <li>
                Breite inkl. Spiegel:
                {activeCar["Width including mirrors (mm)"]} (mm)
              </li>
              <li>Höhe: {activeCar["Height (mm)"]} (mm)</li>
              <li>Leergewicht: {activeCar["Weight Empty (kg)"]} (kg)</li>
              <li>Max. Gewicht: {activeCar["Max Weight (kg)"]}(kg)</li>
            </ul>
          </section>
          <section>
            <p>Weitere Details:</p>
            <ul>
              <li>Antrieb: {activeCar.Drive}</li>
              <li>Modelljahr: {activeCar["Model Year"]}</li>
              <li>Hubraum (ccm): {activeCar["Engine Displacement (ccm)"]}</li>
              <li>Getriebe: {activeCar.Transmission}</li>
              <li>Anzahl Gänge: {activeCar["Number of Gears"]}</li>
              <li>
                Höchstgeschwindigkeit: {activeCar["Max Speed (km/h)"]} km/h
              </li>
            </ul>
          </section>
        </>
      )}
    </>
  );
}
