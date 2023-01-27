import { userCar } from "@/pages";
import { useAtom } from "jotai";

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

export default function EditCarForm({ onSubmit, form }) {
  const [activeCar] = useAtom(userCar);
  if (!activeCar) {
    return <p>loading</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      {groups.map((group) => {
        return (
          <fieldset key={group.id}>
            <p>{group.headline}</p>
            {Object.keys(activeCar).map((attribute, index) => {
              if (group.content.includes(attribute)) {
                const attributeValue = carPrototype[attribute];

                const type =
                  typeof attributeValue === "string" ? "text" : "number";
                return (
                  <div key={group.id + index}>
                    <label>
                      {attribute}:
                      <input
                        name={attribute}
                        type={type}
                        defaultValue={
                          form === "edit" ? activeCar[attribute] : null
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
