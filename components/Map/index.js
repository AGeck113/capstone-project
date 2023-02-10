import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import LocationMarker from "./LocationMarker";
import * as L from "leaflet";
import { useState } from "react";
import Link from "next/link";
const StyledMapContainer = styled(MapContainer)`
  width: 85vw;
  height: 50vh;
  margin 2rem auto 1rem 3.4rem;
  border-radius: 2rem;
`;
const StyledDescription = styled.p`
  overflow-wrap: break-word;
  height: fit-content;
  width: 15rem;
  background-color: hsla(0, 0%, 100%, 0.22);
  border: 3px solid black;
  border-radius: 1rem;
  padding: 1rem 1rem;
`;
const eventIcon = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/dkvlwgih8/image/upload/v1675440482/26f62233d376b22537234a811.png",
  shadowUrl: "",
  iconSize: [41, 41],
  iconAnchor: [20, 20],
  popupAnchor: [20, -34],
  shadowSize: [41, 41],
});
const StyledDetails = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85vw;
  margin: 1rem auto 1rem 3.4rem;
  background-color: hsla(0, 0%, 4%, 0.64);
  color: lightgray;
  border-radius: 2rem;
`;
const StyledHeadline = styled.h3`
  padding: 0.5rem 1rem;
  border-bottom: 2px solid lightgray;
`;
const StyledPageHeadline = styled.h2`
  text-align: center;
  color: lightgray;
  background-color: hsla(0, 0%, 4%, 0.64);
  padding: 0.5rem 0.5rem;
`;
const markers = [
  {
    id: 1,
    name: "Tuning World Bodensee",
    lat: 47.677,
    long: 9.508,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    name: "Essen Motor Show",
    lat: 51.429,
    long: 6.995,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    name: "US Car Treffen",
    lat: 50.54,
    long: 7.432,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    name: "Cars and Coffe",
    lat: 48.54,
    long: 8.432,
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
];
export default function Map() {
  const [selectedEvent, setSelectedEvent] = useState(false);
  return (
    <>
      <StyledPageHeadline>Find events for your tour!</StyledPageHeadline>
      <StyledMapContainer center={[48.521, 9.057]} zoom={8} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.long]}
              icon={eventIcon}
            >
              <Popup>
                <h2>{marker.name}</h2>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent(
                      markers.find((mark) => mark.id === marker.id)
                    );
                  }}
                >
                  See Details
                </button>
              </Popup>
            </Marker>
          );
        })}
        <LocationMarker />
      </StyledMapContainer>
      {selectedEvent ? (
        <StyledDetails>
          <StyledHeadline>{selectedEvent.name}</StyledHeadline>
          <StyledDescription>{selectedEvent.description}</StyledDescription>
          <Link
            href={`https://maps.google.com/?q=${selectedEvent.lat},${selectedEvent.long}`}
          >
            Open on Google Maps
          </Link>
        </StyledDetails>
      ) : null}
    </>
  );
}
