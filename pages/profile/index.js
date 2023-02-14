import EditCarForm, { carPrototype, groups } from "@/components/EditCarForm";
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
const StyledGroupDescription = styled.p`
  grid-column: 1/3;
  background-color: hsla(0, 0%, 100%, 0.22);
  height: fit-content;
  text-align: center;
  color: lightgray;
  margin: 1rem auto;
  width: 80%;
  border-radius: 1rem;
  font-size: 1.5rem;
`;
const StyledDataContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 1rem;
  margin-top: -0.2rem;
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
  padding: 1rem 0rem 0.8rem 1.5rem;
  font-size: 1.2rem;
`;

const StyledInformation = styled.p`
  margin-left: -0.4rem;
  width: 80%;
`;
const StyledData = styled.p`
  margin-left: 0.5rem;
  width: 40%;
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
  function handleCancel() {
    setIsEditing(false);
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

          <EditCarForm
            onCancel={handleCancel}
            initialValues={activeCar}
            onSubmit={handleSubmit}
          />
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

            {groups.map((group) => {
              return (
                <StyledSection key={group.id}>
                  <StyledGroupDescription>
                    {group.description}
                  </StyledGroupDescription>
                  {Object.keys(carPrototype).map((attribute, index) => {
                    if (group.content.includes(attribute)) {
                      return (
                        <StyledDataContainer key={group.id + index}>
                          <StyledData>{attribute}:</StyledData>
                          <StyledInformation>
                            {activeCar[attribute]}
                          </StyledInformation>
                        </StyledDataContainer>
                      );
                    }
                  })}
                </StyledSection>
              );
            })}
          </ContentContainer>
        </>
      )}
    </>
  );
}
