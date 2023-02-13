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
  font-size: 1.2rem;
  margin-top: 0.4rem;
  fond-weight: bold;
`;
export default function LinkSection() {
  return (
    <LinkContainer>
      <StyledLink href={`/events/latest`}>
        <SVGIcon variant="last" width="4rem" />
        <StyledParagraph>Last</StyledParagraph>
      </StyledLink>
      <StyledLink href={`/events/upcoming`}>
        <SVGIcon variant="next" width="4rem" />
        <StyledParagraph>Next</StyledParagraph>
      </StyledLink>
      <StyledLink href={`/events/wishlist`}>
        <SVGIcon variant="wish" width="4rem" />
        <StyledParagraph>Wishes</StyledParagraph>
      </StyledLink>
      <StyledLink href={`/map`}>
        <SVGIcon variant="map" width="4rem" />
        <StyledParagraph>Events</StyledParagraph>
      </StyledLink>
    </LinkContainer>
  );
}
