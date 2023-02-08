import { useState } from "react";
import styled from "styled-components";

export default function AddEventForm({ onSubmit, appointment }) {
  const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width: 95%;
    font-size: 1.2rem;
    align-items: center;
    border-radius: 2rem;
    background-color: #ccd9ff;
    margin: 1rem auto;
    padding 1rem 1rem;
  `;

  return (
    <StyledForm onSubmit={onSubmit}>
      <p>Please fill in the form:</p>
      {appointment ? (
        <label>
          Type:
          <select
            name="type"
            onChange={(event) => {
              handleChangeType(event);
            }}
            defaultValue={appointment.type}
          >
            <option value="wishlist">Wishlist</option>
            <option value="latest">Latest</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>
      ) : (
        <label>
          Type:
          <select
            name="type"
            onChange={(event) => {
              handleChangeType(event);
            }}
            defaultValue={"wishlist"}
          >
            <option value="wishlist">Wishlist</option>
            <option value="latest">Latest</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </label>
      )}
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
          required={type === "wishlist" ? true : false}
          min="2020-01-01"
          max="2030-12-31"
        ></input>
      </label>

      <button type="submit">Submit</button>
    </StyledForm>
  );
}
