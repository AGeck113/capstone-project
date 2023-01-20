import Image from "next/image";
import { useRouter } from "next/router";
import Cars from "../../db/db.json";
export default function CarDetails() {
  const router = useRouter();
  const { vin } = router.query;
  const activeCar = Cars.find((car) => {
    console.log(car.VIN);
    console.log(vin);
    return car.VIN === vin;
  });
  console.log(activeCar);
  return (
    <>
      {activeCar ? (
        <>
          <Image
            alt="usercar"
            src="https://images.unsplash.com/photo-1579631962852-306c90e1c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
            width={200}
            height={200}
          />
          <h1>Mein Auto:</h1>
          <section>
            <p>Wichtige Daten:</p>
            <ul>
              <li>Marke: {activeCar.Make}</li>
              <li>Modell: {activeCar.Model}</li>
              <li>KM-Stand: {activeCar.milage}</li>
              <li>Kennzeichen: {activeCar.plate}</li>
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
              <li>Hubraum (ccm): {activeCar["Engine Displacement (ccm)"]}</li>
              <li>Getriebe: {activeCar.Transmission}</li>
              <li>Anzahl Gänge: {activeCar["Number of Gears"]}</li>
              <li>
                Höchstgeschwindigkeit: {activeCar["Max Speed (km/h)"]} km/h
              </li>
            </ul>
          </section>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
