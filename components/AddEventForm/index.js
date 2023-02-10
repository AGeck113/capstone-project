import { useState } from "react";
import styled from "styled-components";

export default function AddEventForm({ onSubmit, appointment }) {
  const [selectedType, setSelectedType] = useState();

  const StyledForm = styled.form`
    width: 80%;
    margin: 1rem auto 1rem 3.4rem;
    display: flex;
    flex-direction: column;
    background-color: hsla(0, 0%, 4%, 0.64);
    color: lightgray;
    border-radius: 2rem;
  `;
  const StyledSubmitButton = styled.button`
    width: 3rem;
  `;
  const StyledParagraph = styled.p`
    align-self: center;
    font-size: 1.4rem;
  `;

  function handleChangeType(event) {
    event.preventDefault();
    setSelectedType(event.target.value);
    return true;
  }

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledParagraph>Please fill in the form:</StyledParagraph>

      <label>
        Type:
        <select
          name="type"
          onChange={(event) => {
            handleChangeType(event);
            appointment.type = event.target.value;
          }}
          defaultValue={appointment.type}
        >
          <option value="wishlist">Wishlist</option>
          <option value="latest">Latest</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </label>

      <label>
        Title:
        <input
          required
          maxLength={20}
          type="text"
          name="title"
          defaultValue={appointment ? appointment.title : null}
        ></input>
      </label>
      <label>
        Description:
        <textarea
          required
          maxLength={300}
          rows={10}
          type="text"
          name="description"
          defaultValue={appointment ? appointment.description : null}
        ></textarea>
      </label>
      <label>
        Cost:
        <input
          required
          type="number"
          min={0}
          max={999999}
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
        Date:
        <input
          type="date"
          name="date"
          defaultValue={appointment ? appointment.date : null}
          required={selectedType === "wishlist" ? false : true}
          min="2020-01-01"
          max="2030-12-31"
        ></input>
      </label>

      <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
    </StyledForm>
  );
}
