import Image from "next/image";
export default function CarDetails({ activeCar }) {
  console.log(activeCar);
  return (
    <>
      <Image
        alt="usercar"
        src="https://images.unsplash.com/photo-1579631962852-306c90e1c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
        width={200}
        height={200}
      />
      <h1>Mein Auto:</h1>
      <h2>Wichtige Daten:</h2>
      <p>Marke: {activeCar.Make}</p>
      <p>Modell: {activeCar.Model}</p>
      <p>KM-Stand: {activeCar.milage}</p>
      <p>Kennzeichen: {activeCar.plate}</p>
      <h2>Maße:</h2>
      <p>Länge (mm): {activeCar.Length}</p>
      <p>Breite (mm): {activeCar.width}</p>
      <p>Höhe (mm): {activeCar.Height}</p>
      <p>Leergewicht (kg): {activeCar.emptyWeight}</p>
      <p>Max. Gewicht (kg): {activeCar.maxWeight}</p>
      <h2>Weitere Details:</h2>
      <p>Antrieb: {activeCar.Drive}</p>
      <p>Hubraum (ccm): {activeCar.engineDisplacement}</p>
      <p>Getriebe: {activeCar.transmission}</p>
      <p>Höchstgeschwindigkeit: {activeCar.maxSpeed}</p>
    </>
  );
}
