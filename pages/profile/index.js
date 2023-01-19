import EditCarForm from "@/components/EditCardForm";
import { initialTestCarArray, initialCar } from "@/pages/_app";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
//show form always, VIN is just an option!
export default function ProfilePage() {
  const [testCarArray, setTestCarArray] = useAtom(initialTestCarArray);
  const [myCar, setMyCar] = useAtom(initialCar);
  console.log(testCarArray);
  const router = useRouter();

  function handleSubmitVIN(event) {
    event.preventDefault();
    const vin = event.target.elements.vin.value;
    // setMyCar(
    //   testCarArray.find((car) => {
    //     return car.vin === vin;
    //   })
    // );
    router.push(`/profile/${vin}`);
  }

  return (
    <>
      <h1>title</h1>
      <Link href="/">Back</Link>
      <form
        onSubmit={(event) => {
          handleSubmitVIN(event);
        }}
      >
        <h2>Search your car by the VIN!</h2>
        <label htmlFor="vin">
          VIN:<br></br>
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
      <h2>Or create your car by yourself:</h2>

      <EditCarForm
        carResponse={myCar}
        onSubmit={(event) => {
          handleSubmitForm(event);
        }}
      />
    </>
  );
}
