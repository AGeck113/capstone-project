import EditCarForm from "@/components/EditCarForm";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userCar, users } from "../index";
import useSWR from "swr";
export default function CarDetails() {
  const [activeCar, setActiveCar] = useAtom(userCar);
  const [user, setUser] = useState(users[0]);
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useSWR(`/api/userCars/${user.id}`);
  const router = useRouter();

  useEffect(() => {
    setActiveCar(data);
  }, [data]);

  if (!data) {
    return <p>loading...</p>;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newCar = { ...data, UserId: user.id };
    try {
      const response = await fetch(`api/userCars/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(newCar),
        headers: { "Content-type": "application/json" },
      });
      const responseCar = await response.json();
      setUser({ ...user, car: data.VIN });
      setActiveCar(responseCar);
      setIsEditing(false);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }
  function handleUploadFile(event) {
    event.preventDefault();
    if (event.target.files[0].size > 10485760) {
      alert("Your picture is too big, Max 10 MB!");
    }
  }
  async function handleSubmitPicture(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch(`/api/uploadPicture/${user.id}`, {
        method: "POST",
        body: formData,
      });

      const responseCar = await response.json();
      setActiveCar(responseCar);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }
  if (!activeCar) {
    return <p>loading...</p>;
  }

  return (
    <>
      {isEditing ? (
        <>
          <form onSubmit={handleSubmitPicture}>
            <label>
              Update your picture!
              <input
                type="file"
                name="imageFile"
                required
                onChange={handleUploadFile}
              />
            </label>
            <button type="submit">Submit new Picture</button>
          </form>

          <EditCarForm initialValues={activeCar} onSubmit={handleSubmit} />
        </>
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
              activeCar.ImageUrl ||
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
