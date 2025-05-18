import { HighlightRanges } from "@nozbe/microfuzz";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";

import Observation from "./Observation";

import { GroupedObservations, Observation as ObservationType } from "../types";

import "./SearchResults.css";
import { useMemo } from "react";

type SearchResultProps = {
  observation: ObservationType;
  onClick: (observation: ObservationType) => void;
  hl: HighlightRanges | null;
};

function SearchResult({ observation, onClick, hl }: SearchResultProps) {
  return (
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
        highlighted={hl}
      />
    </button>
  );
}

type SearchResultsProps = {
  visible: boolean;
  query: string;
  data: GroupedObservations;
  onClick: (observation: ObservationType) => void;
};

function SearchResults({ visible, query, data, onClick }: SearchResultsProps) {
  const flatData = useMemo(
    () =>
      Array.from(data.values())
        .flatMap((year) => Array.from(year.values()))
        .sort((a, b) => b[0].firstSeen - a[0].firstSeen)
        .flat(),
    [data]
  );

  const filteredData = useFuzzySearchList<ObservationType, SearchResultProps>({
    list: flatData,
    key: query,
    getText: useMemo(
      () => (observation) => {
        const sciName = observation.scientificName.toLowerCase();
        const coName = observation.commonName.toLowerCase();
        return [sciName, coName];
      },
      []
    ),
    queryText: query.toLowerCase(),
    mapResultItem: useMemo(
      () =>
        ({ item, matches: [highlightRanges] }) => ({
          observation: item,
          onClick: () => onClick(item),
          hl: highlightRanges,
        }),
      [onClick]
    ),
    strategy: "smart",
  });

  if (filteredData.length === 0) {
    return (
      <div
        className={`leaflet-popup search-results ${!visible ? "hidden" : ""}`}
      >
        <div className="leaflet-popup-content-wrapper">
          <div className="leaflet-popup-content">
            <div className="no-observations">No results found.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`leaflet-popup search-results ${!visible ? "hidden" : ""}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <div className="observations">
            {filteredData.map((props) => (
              <SearchResult key={props.observation.id} {...props} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
