export default function AddEventForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <p>Please fill in the form:</p>
      <label>
        Title:<input type="text" name="title"></input>
      </label>
      <label>
        Description:<input type="textarea" name="description"></input>
      </label>
      <label>
        Cost:
        <input type="number" name="cost"></input>€
      </label>
      <label>
        Priority:
        <select name="priority">
          <option value={1}>1 (Not important)</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5 (very important)</option>
        </select>
      </label>
      <label>
        Date: <input type="date" name="date"></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
