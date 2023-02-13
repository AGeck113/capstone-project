import styled from "styled-components";

const StyledCostContainer = styled.section`
  width: 90%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between
  border: 2px solid black;
  border-radius: 2rem;
  background-color: hsla(0, 0%, 4%, 0.64);
  padding: 0.5rem 0.5rem;
  align-items: center;
  max-width: 540px;
`;
const StyledCostDescription = styled.h3`
  color: lightgray;
  text-align: center;
  font-size: 1.3rem;
`;
const StyledCost = styled.p`
  width: 60%;
  background-color: hsla(0, 0%, 100%, 0.22);
  border: 1px solid black;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  color: lightgray;
  text-align: end;
  font-size: 1.3rem;
`;
export default function CostOverwiev({ type, cost }) {
  return (
    <StyledCostContainer>
      <StyledCostDescription>Combined Cost:</StyledCostDescription>
      <StyledCost>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(cost)}
      </StyledCost>
    </StyledCostContainer>
  );
}
