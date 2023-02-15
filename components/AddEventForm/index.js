import { useState } from "react";
import styled from "styled-components";
import SVGIcon from "../Icons";

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
    padding: 0.5rem 1rem;
    max-width: 540px;
  `;
  const StyledSelectSection = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0.5rem auto;
    border: 2px solid lightgray;
    border-radius: 1rem;
  `;
  const StyledSubmitButton = styled.button`
    width: 5rem;
    margin: 0.5rem auto;
    height: 5rem;
    border-radius: 999px;
    background-color: hsla(103, 100%, 34%, 0.89);
  `;
  const StyledParagraph = styled.p`
    align-self: center;
    font-size: 1.4rem;
  `;
  const StyledLabel = styled.label`
    font-size: 1.2rem;
    margin 0.5rem auto
  `;
  const StyledSelect = styled.select`
    width: 95%;
    margin: 0.5 auto;
    border-radius: 999px;
    height: 2rem;
    text-align: center;
    background-color: lightgray;
  `;
  const StyledInput = styled.input`
    width: 80%;
    margin: 0 auto;
    padding: 0.2rem;
    height: 2rem;
    font-size: 1.3rem;
    border-radius: 999px;
    background-color: lightgray;
  `;
  const StyledInputCostDate = styled.input`
    width: 95%;
    margin: 0.5rem auto;
    border-radius: 999px;
    height: 2rem;
    text-align: center;
    background-color: lightgray;
  `;

  const StyledTextarea = styled.textarea`
    width: 80%;
    background-color: lightgray;
    border-radius: 1rem;
    margin: 0.3rem auto;
    padding: 0.5rem;
  `;

  function handleChangeType(event) {
    event.preventDefault();
    setSelectedType(event.target.value);
    return true;
  }

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledParagraph>Please fill in the form:</StyledParagraph>

      <StyledLabel htmlFor="title"> Title:</StyledLabel>
      <StyledInput
        id="title"
        required
        maxLength={20}
        type="text"
        name="title"
        defaultValue={appointment ? appointment.title : null}
      />
      <StyledLabel htmlFor="description">Description:</StyledLabel>
      <StyledTextarea
        id="description"
        required
        maxLength={300}
        rows={10}
        type="text"
        name="description"
        defaultValue={appointment ? appointment.description : null}
      ></StyledTextarea>
      <StyledSelectSection>
        <StyledLabel htmlFor="type">Type:</StyledLabel>
        <StyledSelect
          id="type"
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
        </StyledSelect>
        <StyledLabel htmlFor="cost">Cost in €: </StyledLabel>
        <StyledInputCostDate
          id="cost"
          required
          type="number"
          min={0}
          max={999999}
          name="cost"
          defaultValue={appointment ? appointment.cost : null}
        />

        <StyledLabel htmlFor="priority">Priority: </StyledLabel>
        <StyledSelect
          id="priority"
          name="priority"
          required
          defaultValue={appointment ? appointment.priority : null}
        >
          <option value="Not important"> Not important</option>
          <option value="Medium important">Medium important</option>
          <option value="Very important">Very important</option>
        </StyledSelect>

        <StyledLabel htmlFor="date">Date: </StyledLabel>
        <StyledInputCostDate
          id="date"
          type="date"
          name="date"
          defaultValue={appointment ? appointment.date : null}
          required={!(selectedType === "wishlist")}
          min="2020-01-01"
          max="2030-12-31"
        />
      </StyledSelectSection>

      <StyledSubmitButton type="submit">
        <SVGIcon variant={"save"} width="4rem" />
      </StyledSubmitButton>
    </StyledForm>
  );
}
