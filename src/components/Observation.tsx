import { formatLocations } from "../types";
import "./Observation.css";

type ObservationProps = {
  commonName: string;
  scientificName: string;
  firstSeen: number;
  totalSeen?: number;
  notes?: string;
  images?: string[];
  ebirdURL?: string;
  locations?: string;
  showYear?: boolean;
  showLocations?: boolean;
};

function Observation({
  commonName,
  scientificName,
  firstSeen,
  totalSeen,
  notes,
  ebirdURL,
  locations,
  showYear = false,
  showLocations = false,
}: ObservationProps) {
  return (
    <div className="observation">
      <div>
        <h2 className="common-name">
          {ebirdURL ? (
            <a href={ebirdURL} target="_blank" rel="nofollow,noreferrer">
              {commonName}
            </a>
          ) : (
            commonName
          )}
          {totalSeen && (
            <span
              className="badge badge-outline badge-secondary"
              title="Total observed"
            >
              {totalSeen}
            </span>
          )}
        </h2>
        <span className="sci-name">{scientificName}</span>
        {showYear && firstSeen && (
          <span className="firstSeen">
            {firstSeen}
          </span>
        )}
        {showLocations && locations && (
          <span className="location">
            {formatLocations(locations)}
          </span>
        )}
      </div>
      <div className="stats">
        {notes && <div>{notes}</div>}
        {/* {images.length > 0 && (
          <div className="tooltip" data-tip="View images (soon)">
            <FaCamera />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Observation;
