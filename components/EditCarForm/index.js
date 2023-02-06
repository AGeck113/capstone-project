import { userCar, user } from "@/pages";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";

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
const groups = [
  {
    id: 1,
    description: "Important data",
    content: ["Make", "Model", "Milage", "Plate", "ImageUrl", "VIN"],
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
function handleUploadFile(event) {
  event.preventDefault();
  if (event.target.files[0].size > 10485760) {
    alert("Your picture is too big, Max 10 MB!");
  }
}
export default function EditCarForm({ onSubmit, form, activeCar }) {
  return (
    <form onSubmit={onSubmit}>
      {groups.map((group) => {
        return (
          <fieldset key={group.id}>
            <p>{group.description}</p>
            {Object.keys(carPrototype).map((attribute, index) => {
              if (group.content.includes(attribute)) {
                const attributeValue = carPrototype[attribute];

                const type =
                  typeof attributeValue === "string" ? "text" : "number";
                return (
                  <div key={group.id + index}>
                    <label>
                      {attribute}:
                      <input
                        name={
                          attribute === "ImageUrl" ? "imageFile" : attribute
                        }
                        type={attribute === "ImageUrl" ? "file" : type}
                        onChange={
                          attribute === "ImageUrl" ? handleUploadFile : null
                        }
                        // max={type === "number" ? 2000000 : null}
                        maxLength={
                          attribute === "ImageUrl"
                            ? null
                            : type === "text"
                            ? "17"
                            : null
                        }
                        defaultValue={
                          attribute === "ImageUrl"
                            ? null
                            : form === "edit"
                            ? activeCar[attribute]
                            : null
                        }
                      ></input>
                    </label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </fieldset>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}
