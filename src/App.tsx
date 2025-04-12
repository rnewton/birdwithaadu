import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Observation from "./components/Observation";

const DefaultIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  return (
    <MapContainer
      className="map-container"
      center={[47.6, -122.33]}
      zoom={11}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png"
        // Basic map: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-3.1906999,35.5369115]}>
        <Popup maxWidth={800}>
          <Observation 
            commonName="Common Ostrich"
            scientificName="Struthio camelus"
            firstSeen="2015-05-22"
            totalSeen={5}
            notes="We'll put some notes about the observation here."
            images={["https://via.placeholder.com/150"]}
          />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
