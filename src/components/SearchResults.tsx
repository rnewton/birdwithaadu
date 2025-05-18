import Observation from "./Observation";

import { GroupedObservations, Observation as ObservationType } from "../types";

import "./SearchResults.css";

type SearchResultsProps = {
  visible: boolean;
  query: string;
  data: GroupedObservations;
  onClick: (observation: ObservationType) => void;
};

function SearchResults({ visible, query, data, onClick }: SearchResultsProps) {
  if (query.length < 3 || !data) {
    return <></>;
  }

  return (
    <div className={`leaflet-popup search-results ${!visible ? 'hidden' : ''}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <div className="observations">
            {Array.from(data.values())
              .flatMap((year) => Array.from(year.values()))
              .sort((a, b) => b[0].firstSeen - a[0].firstSeen)
              .flat()
              .filter(
                (observation) =>
                  observation.scientificName
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  observation.commonName
                    .toLowerCase()
                    .includes(query.toLowerCase())
              )
              .map((observation) => (
                <button
                  key={observation.id}
                  className="result"
                  onClick={() => {
                    onClick(observation);
                  }}
                >
                  <Observation
                    commonName={observation.commonName}
                    scientificName={observation.scientificName}
                    firstSeen={observation.firstSeen}
                    locations={observation.locations}
                    showLocations
                    showYear
                  />
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
