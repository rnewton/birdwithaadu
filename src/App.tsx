import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import Papa from "papaparse";

import "leaflet/dist/leaflet.css";
import "./App.css";

import {
  Observation,
  GroupedObservations,
  latLonKey,
} from "./types";
import Observations from "./components/Observations";
import YearSwitcher from "./components/YearSwitcher";
import Marker from "./components/Marker";

function App() {
  // Fetch the csv data once during the first render
  const [data, setData] = useState<GroupedObservations>(new Map());
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/summary.csv");
      const text = await response.text();
      const parsedData = Papa.parse<Observation>(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      // Iterate over the list and group the observations by year and lat/lon
      const groupedData = parsedData.data.reduce(
        (acc: GroupedObservations, row: Observation) => {
          if (!acc.has(row.firstSeen)) {
            acc.set(row.firstSeen, new Map());
          }

          const key = latLonKey(row.lat, row.lon);
          if (!acc.get(row.firstSeen)?.has(key)) {
            acc.get(row.firstSeen)?.set(key, []);
          }
          acc.get(row.firstSeen)?.get(key)?.push(row);

          return acc;
        },
        new Map()
      );

      setData(groupedData);
    };
    fetchData();
  }, []);

  const [year, selectYear] = useState<number>(data.keys().next().value || 2025);

  return (
    <MapContainer
      className="map-container"
      center={[47.6, -122.33]}
      zoom={11}
      worldCopyJump
    >
      <TileLayer
        attribution='&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // Alt map: "https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png"
      />
      <YearSwitcher
        years={Array.from(data.keys())}
        selectedYear={year}
        switchYear={selectYear}
      />

      {Array.from(data.get(year)?.keys() ?? []).map((key: string) => (
        <Marker key={key} positionKey={key}>
          <Popup
            className="observations-container"
            minWidth={250}
            maxWidth={600}
          >
            <Observations
              key={key}
              observations={data.get(year)?.get(key) || []}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
