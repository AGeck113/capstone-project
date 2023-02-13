import styled from "styled-components";
import StyledLink from "@/components/Links/StyledLink";
import SVGIcon from "@/components/Icons";
const LinkContainer = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
`;
const StyledParagraph = styled.p`
  color: lightgray;
  font-size: 1.1rem;
  margin-top: 0.4rem;
  font-weight: bold;
`;
export default function LinkSection() {
  return (
    <LinkContainer>
      <StyledLink href={`/events/latest`}>
        <SVGIcon variant="last" width="3.5rem" />
        <StyledParagraph>Last</StyledParagraph>
      </StyledLink>
      <StyledLink href={`/events/upcoming`}>
        <SVGIcon variant="next" width="3.5rem" />
        <StyledParagraph>Next</StyledParagraph>
      </StyledLink>
      <StyledLink href={`/events/wishlist`}>
        <SVGIcon variant="wish" width="3.5rem" />
        <StyledParagraph>Wishes</StyledParagraph>
      </StyledLink>
      <StyledLink href={`/map`}>
        <SVGIcon variant="map" width="3.5rem" />
        <StyledParagraph>Events</StyledParagraph>
      </StyledLink>
    </LinkContainer>
  );
}
