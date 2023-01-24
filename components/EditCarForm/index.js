import { useState } from "react";

export default function EditCarForm({ activeCar, onSubmit, groups }) {
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
