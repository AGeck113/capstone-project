export default function EditCarForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="Make">
        Brand:
        <input type="text" id="Make" name="Make"></input>
      </label>
      <label htmlFor="Model">
        Model:
        <input type="text" name="Model" id="Model"></input>
      </label>
      <label htmlFor="milage">
        Milage (km): <input name="milage" id="milage" type="number"></input>
      </label>
      <label htmlFor="plate">
        Plate:
        <input type="text" name="plate" id="plate"></input>
      </label>
      <label>
        {/* How to adress key model year??? */}
        Model Year:<input></input>
      </label>
      <label htmlFor="emptyWeight">
        Empty Weight:
        <input type="number" name="emptyWeight" id="emptyWeight"></input>
      </label>
      <label htmlFor="Height">
        Height:
        <input type="number" name="Height" id="Height"></input>
      </label>
      <label htmlFor="Length">
        Length:
        <input type="number" name="Length" id="Length"></input>
      </label>
      <label htmlFor="width">
        Width:
        <input type="number" name="width" id="width"></input>
      </label>
      <label htmlFor="maxWeight">
        Max Weight (kg):
        <input type="number" name="maxWeight" id="maxWeight"></input>
      </label>
      <label htmlFor="transmission">
        Transmission:
        <input type="text" name="transmission" id="transmission"></input>
      </label>
      <label htmlFor="engineDisplacement">
        Engine Displacement (ccm):
        <input
          type="text"
          name="engineDisplacement"
          id="engineDisplacement"
        ></input>
      </label>
      <label htmlFor="Drive">
        Drive:
        <input type="text" name="Drive" id="Drive"></input>
      </label>
      <label htmlFor="maxSpeed">
        Max Speed (km/h):
        <input type="text" name="maxSpeed" id="maxSpeed"></input>
      </label>
      <label htmlFor="fuelType">
        <input name="fuelType" id="fuelType"></input>
      </label>
      <label htmlFor="fuelCombined">
        Fuel Consumption Combined (l/100km)
        <input type="number" id="fuelCombined" name="fuelCombined"></input>
      </label>
      <label htmlFor="fuelExtraUrban">
        Fuel Consumption extra Urban (l/100km)
        <input type="number" id="fuelExtraUrban" name="fuelExtraUrban"></input>
      </label>
      <label htmlFor="fuelUrban">
        Fuel Consumption Urban (l/100km)
        <input type="number" id="fuelUrban" name="fuelUrban"></input>
      </label>
      <label htmlFor="imageLink">
        Image Link:<input type="text" name="imageLink" id="imageLink"></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
