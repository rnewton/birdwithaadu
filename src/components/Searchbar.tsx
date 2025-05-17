import "./Searchbar.css";

type SearchbarProps = {
  query: string;
  setQuery: (q: string) => void;
  onFocus?: () => void;
};

function Searchbar({ query, setQuery, onFocus }: SearchbarProps) {
  return (
    <div className="searchbar leaflet-top leaflet-left">
      <input
        className="input input-lg input-primary"
        type="text"
        placeholder="Search for a species..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
      />
    </div>
  );
}

export default Searchbar;
