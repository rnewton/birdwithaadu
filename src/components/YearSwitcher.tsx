import { useMap } from "react-leaflet";

import "./YearSwitcher.css";
import { DEFAULT_ANIMATION_OPTIONS, RESET_CENTER, RESET_ZOOM } from "../constants";

type YearSwitcherProps = {
  years: number[];
  selectedYear: number;
  switchYear: (year: number) => void;
};

function YearSwitcher({ years, selectedYear, switchYear }: YearSwitcherProps) {
  const map = useMap();
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
            map.flyTo(RESET_CENTER, RESET_ZOOM, DEFAULT_ANIMATION_OPTIONS);
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
