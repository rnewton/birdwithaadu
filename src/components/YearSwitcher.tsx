import "./YearSwitcher.css";

type YearSwitcherProps = {
  years: number[];
  selectedYear: number;
  switchYear: (year: number) => void;
};

function YearSwitcher({ years, selectedYear, switchYear }: YearSwitcherProps) {
  years = years.sort((a, b) => a - b);

  return (
    <div className="year-switcher leaflet-top leaflet-right">
      {years.map((year) => (
        <button
          className={`btn ${selectedYear === year ? "btn-secondary" : "btn-primary"}`}
          onClick={() => switchYear(year)}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

export default YearSwitcher;