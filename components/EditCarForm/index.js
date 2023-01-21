export default function EditCarForm({ activeCar }) {
  return (
    <form>
      <label htmlFor="imageLink">
        Image Link:<input type="text" name="imageLink" id="imageLink"></input>
      </label>
      <fieldset>
        <p>Wichtige Daten:</p>
        <label htmlFor="Make">
          Marke:
          <input
            type="text"
            id="Make"
            name="Make"
            defaultValue={activeCar.Make}
          />
        </label>
        <label htmlFor="Model">
          Modell:
          <input
            defaultValue={activeCar.Model}
            type="text"
            name="Model"
            id="Model"
          />
        </label>
        <label htmlFor="milage">
          KM-Stand: <input name="milage" id="milage" type="number"></input>
        </label>
        <label htmlFor="plate">
          Kennzeichen:
          <input
            type="text"
            name="plate"
            id="plate"
            defaultValue="AB-CD 1234"
          />
        </label>
      </fieldset>
      <fieldset>
        <p>Maße:</p>
        <label htmlFor="Length">
          Länge:
          <input
            type="number"
            name="Length"
            id="Length"
            defaultValue={activeCar["Length (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="width">
          Breite:
          <input
            type="number"
            name="width"
            id="width"
            defaultValue={activeCar["Width (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="width">
          Breite inkl. Spiegel:
          <input
            type="number"
            name="width"
            id="width"
            defaultValue={activeCar["Width including mirrors (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="height">
          Höhe:
          <input
            type="number"
            name="height"
            id="height"
            defaultValue={activeCar["Height (mm)"]}
          />
          (mm)
        </label>
        <label htmlFor="weightEmpty">
          Leergewicht:
          <input
            type="number"
            name="weightEmpty"
            id="weightEmpty"
            defaultValue={activeCar["Weight Empty (kg)"]}
          />
          (kg)
        </label>
        <label htmlFor="maxWeight">
          Max. Gewicht:
          <input
            type="number"
            name="maxWeight"
            id="maxWeight"
            defaultValue={activeCar["Max Weight (kg)"]}
          />
          (kg)
        </label>
      </fieldset>
      <fieldset>
        <p>Weitere Daten:</p>
        <label htmlFor="Drive">
          Antrieb:
          <input
            type="text"
            name="Drive"
            id="Drive"
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
        <label htmlFor="engineDisplacement">
          Hubraum:
          <input
            type="text"
            name="engineDisplacement"
            id="engineDisplacement"
            defaultValue={activeCar["Engine Displacement (ccm)"]}
          />
          (ccm)
        </label>
        <label htmlFor="transmission">
          Getriebe:
          <input
            type="text"
            defaultValue={activeCar.Transmission}
            name="transmission"
            id="transmission"
          />
        </label>
        <label htmlFor="numberOfGears">
          Max Speed (km/h):
          <input
            type="number"
            name="NumberOfGears"
            id="numberOfGears"
            defaultValue={activeCar["Max Speed (km/h)"]}
          />
        </label>
        <label htmlFor="maxSpeed">
          Max Speed (km/h):
          <input
            type="number"
            name="maxSpeed"
            id="maxSpeed"
            defaultValue={activeCar["Max Speed (km/h)"]}
          />
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}
