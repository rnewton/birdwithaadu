import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";

function App() {
  return (
    <MapContainer className="map-container" center={[47.60, -122.33]} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png"
        // Basic map: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[47.60, -122.33]}>
        <Popup>
          Bird with Aadu is under construction. <br /> Please check back later.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
