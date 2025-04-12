import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

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
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png"
        // Basic map: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[47.6, -122.33]}>
        <Popup>
          Bird with Aadu is under construction. <br /> Please check back later.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
