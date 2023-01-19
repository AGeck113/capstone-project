export default function EditCarForm({ carResponse, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="Make">
        Brand:
        <input
          type="text"
          id="Make"
          name="Make"
          defaultValue={carResponse.Make}
        ></input>
      </label>
      <label htmlFor="Model">
        Model:
        <input
          defaultValue={carResponse.Model}
          type="text"
          name="Model"
          id="Model"
        ></input>
      </label>
      <label htmlFor="milage">
        Milage (km): <input name="milage" id="milage" type="number"></input>
      </label>
      <label htmlFor="plate">
        Plate:
        <input
          type="text"
          name="plate"
          id="plate"
          defaultValue="AB-CD 1234"
        ></input>
      </label>
      <label>
        {/* How to adress key model year??? */}
        Model Year:<input defaultValue={carResponse["Model Year"]}></input>
      </label>
      <label htmlFor="emptyWeight">
        Empty Weight:
        <input
          type="number"
          name="emptyWeight"
          id="emptyWeight"
          defaultValue={carResponse["Weight Empty (kg)"]}
        ></input>
      </label>
      <label htmlFor="Height">
        Height:
        <input
          type="number"
          name="Height"
          id="Height"
          defaultValue={carResponse["Height (mm)"]}
        ></input>
      </label>
      <label htmlFor="Length">
        Length:
        <input
          type="number"
          name="Length"
          id="Length"
          defaultValue={carResponse["Length (mm)"]}
        ></input>
      </label>
      <label htmlFor="width">
        Width:
        <input
          type="number"
          name="width"
          id="width"
          defaultValue={carResponse["Width (mm)"]}
        ></input>
      </label>
      <label htmlFor="maxWeight">
        Max Weight (kg):
        <input
          type="number"
          name="maxWeight"
          id="maxWeight"
          defaultValue={carResponse["Max Weight (kg)"]}
        ></input>
      </label>
      <label htmlFor="transmission">
        Transmission:
        <input
          type="text"
          defaultValue={carResponse.Transmission}
          name="transmission"
          id="transmission"
        ></input>
      </label>
      <label htmlFor="engineDisplacement">
        Engine Displacement (ccm):
        <input
          type="text"
          name="engineDisplacement"
          id="engineDisplacement"
          defaultValue={carResponse["Engine Displacement (ccm)"]}
        ></input>
      </label>
      <label htmlFor="Drive">
        Drive:
        <input
          type="text"
          name="Drive"
          id="Drive"
          defaultValue={carResponse.Drive}
        ></input>
      </label>
      <label htmlFor="maxSpeed">
        Max Speed (km/h):
        <input
          type="text"
          name="maxSpeed"
          id="maxSpeed"
          defaultValue={carResponse["Max Speed (km/h)"]}
        ></input>
      </label>
      <label htmlFor="fuelType">
        <input
          name="fuelType"
          id="fuelType"
          defaultValue={carResponse["Fuel Type - Primary"]}
        ></input>
      </label>
      <label htmlFor="fuelCombined">
        Fuel Consumption Combined (l/100km)
        <input
          type="number"
          id="fuelCombined"
          name="fuelCombined"
          defaultValue={carResponse["Fuel Consumption Combined (l/100km)"]}
        ></input>
      </label>
      <label htmlFor="fuelExtraUrban">
        Fuel Consumption extra Urban (l/100km)
        <input
          type="number"
          id="fuelExtraUrban"
          name="fuelExtraUrban"
          defaultValue={carResponse["Fuel Consumption Extra Urban (l/100km)"]}
        ></input>
      </label>
      <label htmlFor="fuelUrban">
        Fuel Consumption Urban (l/100km)
        <input
          type="number"
          id="fuelUrban"
          name="fuelUrban"
          defaultValue={carResponse["Fuel Consumption Urban (l/100km)"]}
        ></input>
      </label>
      <label htmlFor="imageLink">
        Image Link:<input type="text" name="imageLink" id="imageLink"></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
