import EditCarForm, { groups } from "@/components/EditCarForm";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userCar } from "../index";
import useSWR from "swr";
import styled from "styled-components";
import SVGIcon from "@/components/Icons";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import NoCarMessage from "@/components/NoCarMessage";
import StyledImage from "@/components/StyledImage";
const StyledHeadline = styled.h2`
text-align: center;
color: lightgray;
background-color: hsla(0, 0%, 4%, 0.64);
padding: 0.5rem 4rem;
width: 100%;
margin 0 auto;
height: 4rem;
`;
const ContentContainer = styled.section`
  border: 2px solid black;
  margin: 1.5rem 1rem auto 3.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: hsla(0, 0%, 4%, 0.64);
  border-radius: 2rem;
  position: relative;
  color: lightgray;
  max-width: 360px;
`;

const StyledEditButton = styled.button`
  position: absolute;
  top: -1.2rem;
  right: 1rem;
  background-color: hsla(34, 93%, 52%, 0.89);
  border-radius: 999px;
`;
const StyledSection = styled.section`
  border: 2px solid black;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: hsla(0, 0%, 4%, 0.64);
  border-radius: 2rem;
  position: relative;
  color: lightgray;
  width: 80%;
  padding-bottom: 1rem;
`;
const StyledSectionDescription = styled.p`
  align-self: flex-start;
  padding: 1rem 0rem 0.8rem 1.5rem;
  font-size: 1.2rem;
`;

const StyledInformation = styled.p`
  margin: 0.5rem auto;
`;

export default function CarDetails() {
  const [activeCar, setActiveCar] = useAtom(userCar);
  const [isEditing, setIsEditing] = useState(false);
  const { data, mutate, isLoading } = useSWR(`/api/userCars/`, {
    shouldRetryOnError: false,
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setActiveCar(data);
  }, [data]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`api/userCars/`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      });
      const responseCar = await response.json();
      setActiveCar(responseCar);
      setIsEditing(false);
      mutate();
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
    try {
      const response = await fetch(`/api/uploadPicture/`, {
        method: "POST",
        body: formData,
      });
      const responseCar = await response.json();
      setIsEditing(false);
      setActiveCar(responseCar);
      mutate();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    confirm(
      "Are you sure, that you want to delete your car and all Appointments?"
    );
    try {
      const response = await fetch(`/api/userCars/`, { method: "DELETE" });
      if (response.ok) {
        setActiveCar({});
        setIsEditing(false);
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!session) {
    return <Login />;
  }
  if (isLoading) {
    return <p>loading</p>;
  }

  if (!activeCar) {
    return <NoCarMessage />;
  }

  return (
    <>
      <StyledHeadline>Your Car</StyledHeadline>
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
          <button onClick={handleDelete} type="button">
            DELETE CAR
          </button>
        </>
      ) : (
        <>
          <ContentContainer>
            <StyledEditButton
              type="button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <SVGIcon variant="edit" width="35px" />
            </StyledEditButton>
            <StyledImage
              alt="usercar"
              src={
                activeCar.ImageUrl ||
                "https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg"
              }
              width={200}
              height={200}
            />
            <StyledSection>
              <StyledSectionDescription>
                Wichtige Daten:
              </StyledSectionDescription>

              <StyledInformation>Marke: {activeCar.Make}</StyledInformation>
              <StyledInformation>Modell: {activeCar.Model}</StyledInformation>
              <StyledInformation>
                KM-Stand: {activeCar.Milage}
              </StyledInformation>
              <StyledInformation>
                Kennzeichen: {activeCar.Plate}
              </StyledInformation>
            </StyledSection>
            <StyledSection>
              <StyledSectionDescription>Maße:</StyledSectionDescription>

              <StyledInformation>
                Länge: {activeCar["Length (mm)"]}(mm)
              </StyledInformation>
              <StyledInformation>
                Breite: {activeCar["Width (mm)"]}(mm)
              </StyledInformation>
              <StyledInformation>
                Breite inkl. Spiegel:
                {activeCar["Width including mirrors (mm)"]} (mm)
              </StyledInformation>
              <StyledInformation>
                Höhe: {activeCar["Height (mm)"]} (mm)
              </StyledInformation>
              <StyledInformation>
                Leergewicht: {activeCar["Weight Empty (kg)"]} (kg)
              </StyledInformation>
              <StyledInformation>
                Max. Gewicht: {activeCar["Max Weight (kg)"]}(kg)
              </StyledInformation>
            </StyledSection>
            <StyledSection>
              <StyledSectionDescription>
                Weitere Details:
              </StyledSectionDescription>

              <StyledInformation>Antrieb: {activeCar.Drive}</StyledInformation>
              <StyledInformation>
                Modelljahr: {activeCar["Model Year"]}
              </StyledInformation>
              <StyledInformation>
                Hubraum (ccm): {activeCar["Engine Displacement (ccm)"]}
              </StyledInformation>
              <StyledInformation>
                Getriebe: {activeCar.Transmission}
              </StyledInformation>
              <StyledInformation>
                Anzahl Gänge: {activeCar["Number of Gears"]}
              </StyledInformation>
              <StyledInformation>
                Höchstgeschwindigkeit: {activeCar["Max Speed (km/h)"]} km/h
              </StyledInformation>
            </StyledSection>
          </ContentContainer>
        </>
      )}
    </>
  );
}
