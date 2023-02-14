import { useRouter } from "next/router";
import styled from "styled-components";
import SVGIcon from "../Icons";

export const carPrototype = {
  VIN: "",
  Make: "",
  Model: "",
  Milage: 0,
  Plate: "",
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
export const groups = [
  {
    id: 1,
    description: "Important data",
    content: ["Make", "Model", "Milage", "Plate", "VIN"],
  },
  {
    id: 2,
    description: "Dimensions",
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
    description: "More Information",
    content: [
      "Drive",
      "Model Year",
      "Engine Displacement (ccm)",
      "Transmission",
      "Number Of Gears",
    ],
  },
];
const StyledFieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid lightgray;
  border-radius: 1rem;
  background-color: hsla(0, 0%, 4%, 0.64);
  align-items: center;
`;
const StyledLabel = styled.label`
font-size: 1.2rem;
margin 0.5rem auto;
color: lightgray;
`;
const StyledGroupDescription = styled.p`
  grid-column: 1/3;
  background-color: hsla(0, 0%, 100%, 0.22);
  height: 2rem;
  text-align: center;
  color: lightgray;
  margin: 1rem auto;
  width: 60%;
  border-radius: 1rem;
  font-size: 1.5rem;
`;
const StyledInput = styled.input`
  width: 95%;
  margin: 0.5rem auto;
  border-radius: 999px;
  height: 2rem;
  text-align: center;
  background-color: lightgray;
`;
const StyledSubmitButton = styled.button`
  width: 5rem;
  margin: 0 auto;
  height: 5rem;
  border-radius: 999px;
  background-color: hsla(103, 100%, 34%, 0.89);
`;
const StyledForm = styled.form`
position:relative
  width: 85%;
  margin: 1rem auto 0 3.4rem;
  background-color: hsla(0, 0%, 4%, 0.64);
  border-radius: 2rem;
  max-width: 540px;
  padding: 0.2rem 0.2rem;
  display: grid;
  gap: 2rem;
`;

const StyledParagraph = styled.p`
  color: lightgray;
  text-align: center;
  font-size: 1.6rem;
  width: 70%;
  height: 5rem;
  margin: 0.3rem auto;
  padding: 0.5rem 0.5rem;
  border-radius: 1rem;
`;
const StyledCancelButton = styled.button`
  position: absolute;
  right: 0.4rem;
  background-color: hsla(0, 93%, 40%, 0.89);
  border-radius: 999px;
`;
export default function EditCarForm({ onSubmit, initialValues, onCancel }) {
  const router = useRouter();
  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        {initialValues ? (
          <StyledCancelButton type="button" onClick={onCancel}>
            <SVGIcon variant="cancel" width="35px" />
          </StyledCancelButton>
        ) : null}
        <StyledParagraph>
          Please edit and save the data you want
        </StyledParagraph>
        {groups.map((group) => {
          return (
            <StyledFieldset key={group.id}>
              <StyledGroupDescription>
                {group.description}
              </StyledGroupDescription>
              {Object.keys(carPrototype).map((attribute, index) => {
                if (group.content.includes(attribute)) {
                  const attributeValue = carPrototype[attribute];
                  const type =
                    typeof attributeValue === "string" ? "text" : "number";
                  return (
                    <div key={group.id + index}>
                      <StyledLabel htmlFor={attribute}>
                        {attribute}:
                      </StyledLabel>
                      {type === "text" ? (
                        <StyledInput
                          id={attribute}
                          required={
                            attribute === "Make" || attribute === "Model"
                          }
                          name={attribute}
                          type="text"
                          maxLength="17"
                          defaultValue={
                            initialValues?.[attribute]
                              ? initialValues[attribute]
                              : null
                          }
                        />
                      ) : (
                        <StyledInput
                          name={attribute}
                          type="number"
                          max={2000000}
                          defaultValue={
                            initialValues?.[attribute]
                              ? initialValues[attribute]
                              : null
                          }
                        />
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </StyledFieldset>
          );
        })}

        <StyledSubmitButton type="submit">
          <SVGIcon variant="save" width="60px" />
        </StyledSubmitButton>
      </StyledForm>
    </>
  );
}
