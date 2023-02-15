import EditCarForm from "@/components/EditCarForm";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { userCar } from "../index.js";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/index.js";
import styled from "styled-components";
import SVGIcon from "@/components/Icons/index.js";
const carPrototype = {
  VIN: "",
  Make: "",
  Model: "",
  Milage: 0,
  Plate: "",
  ImageUrl: "",
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
const StyledHeadline = styled.h2`
text-align: center;
color: lightgray;
background-color: hsla(0, 0%, 4%, 0.64);
padding: 0.5rem 4rem;
width: 100%;
margin 0 auto;
height: 4rem;
`;
const StyledForm = styled.form`
  width: 80%;
  margin: 1rem auto;
  display: grid;
  gap: 0.5rem;
  background-color: hsla(0, 0%, 4%, 0.64);
  padding: 1.4rem;
  border-radius: 1rem;
`;
const StyledLabel = styled.label`
  color: lightgray;
  margin: 0.4rem auto;
`;
const StyledSelect = styled.select`
  width: 80%;
  margin: 0 auto;
  background-color: lightgray;
`;
const StyledSubmitButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  margin: 0.5rem auto;
  background-color: hsla(103, 100%, 34%, 0.89);
`;

export default function CreateCar() {
  const [activeCar, setActiveCar] = useAtom(userCar);
  const [searchFailed, setSearchFailed] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return <Login />;
  }
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
          };
          const { _id, ...newCarPut } = newCar;
          const responsePost = await fetch(`api/userCars/`, {
            method: "POST",
            body: JSON.stringify(newCarPut),
            headers: { "Content-type": "application/json" },
          });
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

    const newCar = {
      ...carPrototype,
      ...data,
      ImageUrl: null,
    };
    try {
      const response = await fetch(`api/userCars/`, {
        method: "POST",
        body: JSON.stringify(newCar),
        headers: { "Content-type": "application/json" },
      });
      const responseCar = await response.json();
      setActiveCar(responseCar);
      router.push(`/profile/`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StyledHeadline>Register your car!</StyledHeadline>
      <StyledForm onSubmit={handleSubmitVin}>
        {/*         
          Working VINs right now: LRW3E7EL3NC123456,
          WAUZZZ8V9LA015123,W0L0SDL08D0294820 and VF1CN041547024123
        */}
        <StyledLabel htmlFor="vin"> Search your car with your VIN:</StyledLabel>
        <StyledSelect id="vin" name="vin" required>
          <option value="" disabled selected>
            VIN....
          </option>
          <option value="LRW3E7EL3NC123456">LRW3E7EL3NC123456</option>
          <option value="WAUZZZ8V9LA015123">WAUZZZ8V9LA015123</option>
          <option value="W0L0SDL08D0294820">W0L0SDL08D0294820</option>
          <option value="VF1CN041547024123">VF1CN041547024123</option>
        </StyledSelect>
        <StyledSubmitButton type="submit">
          <SVGIcon variant="searchCar" width="30px" />
        </StyledSubmitButton>
      </StyledForm>

      {searchFailed && (
        <p>
          Sorry, we can not find the Vin in our data. Please control your vin.
          If you want, you can also use the form to register your car manually.
        </p>
      )}
      <EditCarForm onSubmit={handleSubmitForm} />
    </>
  );
}
