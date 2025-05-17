import { MapRef } from "react-leaflet/MapContainer";

import { DEFAULT_ANIMATION_OPTIONS, RESET_CENTER, RESET_ZOOM } from "../constants";

import "./YearSwitcher.css";

type YearSwitcherProps = {
  map: MapRef;
  years: number[];
  selectedYear: number;
  switchYear: (year: number) => void;
};

function YearSwitcher({ map, years, selectedYear, switchYear }: YearSwitcherProps) {
  years = years.sort((a, b) => a - b);

  return (
    <div className="year-switcher leaflet-top leaflet-right">
      {years.map((year) => (
        <button
          key={year}
          className={`btn ${
            selectedYear === year ? "btn-secondary" : "btn-primary"
          }`}
          onClick={() => {
            map?.flyTo(RESET_CENTER, RESET_ZOOM, DEFAULT_ANIMATION_OPTIONS);
            switchYear(year);
          }}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

export default YearSwitcher;
