import { useState } from "react";
import initialCars from "../../db/db.json";

export default function EditCarForm({ car, onSubmit }) {
  const defaultValue = { Milage: 0, Plate: "", ImageUrl: "" };
  const [activeCar, setActiveCar] = useState({ ...defaultValue, ...car });
  console.log(activeCar);

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
                        // onChange={() => {
                        //   setActiveCar({
                        //     ...activeCar,
                        //     [attribute]: activeCar[attribute],
                        //   });
                        // }}
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
      {/* 

      <label htmlFor="imageInput">
        Image Link:<input type="text" name="imageUrl" id="imageInput"></input>
        (just unsplash.com)
      </label>
      <fieldset>
        <p>Wichtige Daten:</p>
        <label htmlFor="brand">
          Marke:
          <input
            type="text"
            id="brand"
            name="Make"
            defaultValue={activeCar.Make}
          />
        </label>
        <label htmlFor="model">
          Modell:
          <input
            defaultValue={activeCar.Model}
            type="text"
            name="Model"
            id="model"
          />
        </label>
        <label htmlFor="milageInput">
          KM-Stand: <input name="Milage" id="milageInput" type="number"></input>
        </label>
        <label htmlFor="plateInput">
          Kennzeichen:
          <input
            type="text"
            name="Plate"
            id="plateInput"
            defaultValue={activeCar.plate}
          />
        </label>
      </fieldset>
      <fieldset>
        <p>Maße:</p>
        <label htmlFor="lengthInput">
          Länge:
          <input
            type="number"
            name="Length (mm)"
            id="lengthInput"
            defaultValue={activeCar["Length (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="widthInput">
          Breite:
          <input
            type="number"
            name="Width (mm)"
            id="widthInput"
            defaultValue={activeCar["Width (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="widthWithMirrorsInput">
          Breite inkl. Spiegel:
          <input
            type="number"
            name="Width including mirrors (mm)"
            id="widthWithMirrorsInput"
            defaultValue={activeCar["Width including mirrors (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="heightInput">
          Höhe:
          <input
            type="number"
            name="Height (mm)"
            id="heightInput"
            defaultValue={activeCar["Height (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="emptyWeightInput">
          Leergewicht:
          <input
            type="number"
            name="Weight Empty (kg)"
            id="emptyWeightInput"
            defaultValue={activeCar["Weight Empty (kg)"]}
          />
          (kg)
        </label>
        <label htmlFor="maxWeightInput">
          Max. Gewicht:
          <input
            type="number"
            name="Max Weight (kg)"
            id="maxWeightInput"
            defaultValue={activeCar["Max Weight (kg)"]}
          />
          (kg)
        </label>
      </fieldset>
      <fieldset>
        <p>Weitere Daten:</p>
        <label htmlFor="drive">
          Antrieb:
          <input
            type="text"
            name="Drive"
            id="drive"
            defaultValue={activeCar.Drive}
          />
        </label>
        <label htmlFor="model-year">
          Modelljahr:
          <input
            type="number"
            name="Model Year"
            id="model-year"
            defaultValue={activeCar["Model Year"]}
          />
        </label>
        <label htmlFor="engineDisplacementInput">
          Hubraum:
          <input
            type="text"
            name="Engine Displacement (ccm)"
            id="engineDisplacementInput"
            defaultValue={activeCar["Engine Displacement (ccm)"]}
          />
          (ccm)
        </label>
        <label htmlFor="transmission">
          Getriebe:
          <input
            type="text"
            defaultValue={activeCar.Transmission}
            name="Transmission"
            id="transmission"
          />
        </label>
        <label htmlFor="numberOfGearsInput">
          Max Speed (km/h):
          <input
            type="number"
            name="Number Of Gears"
            id="numberOfGearsInput"
            defaultValue={activeCar["Number of Gears"]}
          />
        </label>
        <label htmlFor="maxSpeedInput">
          Max Speed{" "}
          <input
            type="number"
            name="Max Speed (km/h)"
            id="maxSpeedInput"
            defaultValue={activeCar["Max Speed (km/h)"]}
          />
          (km/h):
        </label>
      </fieldset> */}
      <button type="submit">Submit</button>
    </form>
  );
}
