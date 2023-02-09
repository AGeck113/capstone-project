import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import LocationMarker from "./LocationMarker";
import * as L from "leaflet";
import { useState } from "react";
const StyledMapContainer = styled(MapContainer)`
  width: 70vw;
  height: 50vh;
  margin 2rem auto;
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

const markers = [
  { id: 1, name: "Tuning World Bodensee", lat: 47.677, long: 9.508 },
  { id: 2, name: "Essen Motor Show", lat: 51.429, long: 6.995 },
];
export default function Map() {
  const [selectedEvent, setSelectedEvent] = useState({});
  return (
    <>
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
      <article>
        <h2>{selectedEvent.name}</h2>
      </article>
    </>
  );
}
