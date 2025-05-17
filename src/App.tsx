import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { MapRef } from "react-leaflet/MapContainer";

import Observations from "./components/Observations";
import Searchbar from "./components/Searchbar";
import SearchResults from "./components/SearchResults";
import YearSwitcher from "./components/YearSwitcher";
import Marker from "./components/Marker";

import useData from "./hooks/useData";

import {
  DEFAULT_ANIMATION_OPTIONS,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  TILE_ATTRIBUTION,
  TILE_URL,
} from "./constants";

import "leaflet/dist/leaflet.css";
import "./App.css";
import { latLonKey } from "./types";

function App() {
  // Fetch the csv data once during the first render
  const data = useData();

  const [year, selectYear] = useState<number>(data.keys().next().value || 2025);
  const [query, setQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (query.length >= 3) {
      setShowResults(true);
    }
  }, [query]);

  const [markers, setMarkers] = useState<Map<string, L.Marker>>(new Map());

  const [map, setMap] = useState<MapRef>(null);
  const mapDisplay = useMemo(
    () => (
      <MapContainer
        className="map-container"
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        worldCopyJump
        ref={setMap}
      >
        <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />

        {Array.from(data.get(year)?.keys() ?? []).map((key: string) => (
          <Marker key={key} positionKey={key} setMarkers={setMarkers}>
            <Popup className="observations-container" minWidth={250} keepInView>
              <Observations
                key={key}
                observations={data.get(year)?.get(key) || []}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [data, year]
  );

  return (
    <>
      {map ? (
        <>
          <Searchbar
            query={query}
            setQuery={setQuery}
            onFocus={() => setShowResults(true)}
          />
          <SearchResults
            visible={showResults}
            query={query}
            data={data}
            onClick={(observation) => {
              selectYear(observation.firstSeen);
              map?.flyTo(
                [observation.lat, observation.lon],
                DEFAULT_ZOOM,
                DEFAULT_ANIMATION_OPTIONS
              );

              const key = latLonKey(observation.lat, observation.lon);
              markers.get(key)?.openPopup();

              setShowResults(false);
            }}
          />
          <YearSwitcher
            map={map}
            years={Array.from(data.keys())}
            selectedYear={year}
            switchYear={selectYear}
          />
        </>
      ) : null}

      {mapDisplay}
    </>
  );
}

export default App;
