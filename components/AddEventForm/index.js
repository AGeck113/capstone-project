export default function AddEventForm({ onSubmit, appointment }) {
  return (
    <form onSubmit={onSubmit}>
      <p>Please fill in the form:</p>
      {appointment ? (
        <label>
          Type:
          <select name="type" defaultValue={appointment.type}>
            <option value="wishlist">Wishlist</option>
            <option value="latest">Latest</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>
      ) : null}
      <label>
        Title:
        <input
          required
          maxLength={50}
          type="text"
          name="title"
          defaultValue={appointment ? appointment.title : null}
        ></input>
      </label>
      <label>
        Description:
        <input
          required
          maxLength={500}
          type="textarea"
          name="description"
          defaultValue={appointment ? appointment.description : null}
        ></input>
      </label>
      <label>
        Cost:
        <input
          required
          type="number"
          name="cost"
          defaultValue={appointment ? appointment.cost : null}
        ></input>
        €
      </label>
      <label>
        Priority:
        <select
          name="priority"
          required
          defaultValue={appointment ? appointment.priority : null}
        >
          <option value="Not important"> Not important</option>
          <option value="Medium important">Medium important</option>
          <option value="Very important">Very important</option>
        </select>
      </label>
      <label>
        Date:{" "}
        <input
          type="date"
          name="date"
          defaultValue={appointment ? appointment.date : null}
          required
        ></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
