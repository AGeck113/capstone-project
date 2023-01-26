import { userCar } from "@/pages";
import { useAtom } from "jotai";

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

export default function EditCarForm({ onSubmit, form, carPrototype }) {
  const [activeCar] = useAtom(userCar);
  if (form === "edit") {
    return (
      <form onSubmit={onSubmit}>
        {groups.map((group) => {
          return (
            <fieldset key={group.id}>
              <p>{group.headline}</p>
              {Object.keys(activeCar).map((attribute, index) => {
                if (group.content.includes(attribute)) {
                  const attributeValue = activeCar[attribute];

                  const type =
                    typeof attributeValue === "string" ? "text" : "number";
                  return (
                    <div key={group.id + index}>
                      <label>
                        {attribute}:
                        <input
                          name={attribute}
                          type={type}
                          defaultValue={activeCar[attribute]}
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
  } else {
    return (
      <form onSubmit={onSubmit}>
        <label>
          VIN: <input name="VIN" type="text"></input>
        </label>
        {groups.map((group) => {
          return (
            <fieldset key={group.id}>
              <p>{group.headline}</p>
              {group.content.map((attribute, index) => {
                if (group.content.includes(attribute)) {
                  const attributeValue = carPrototype[attribute];

                  const type =
                    typeof attributeValue === "string" ? "text" : "number";
                  return (
                    <div key={group.id + index}>
                      <label>
                        {attribute}:<input name={attribute} type={type}></input>
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
}
