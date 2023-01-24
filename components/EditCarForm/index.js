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

export default function EditCarForm({ activeCar, onSubmit }) {
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
}
