import "./Observation.css";

type ObservationProps = {
  commonName: string;
  scientificName: string;
  firstSeen: number;
  totalSeen?: number;
  notes?: string;
  images?: string[];
  ebirdURL?: string;
  showYear?: boolean;
  showLocation?: boolean;
};

function Observation({
  commonName,
  scientificName,
  firstSeen,
  totalSeen,
  notes,
  ebirdURL,
  showYear = false,
  showLocation = false,
}: ObservationProps) {
  return (
    <div className="observation">
      <div>
        <h2 className="common-name">
          {ebirdURL ? (<a href={ebirdURL} target="_blank" rel="nofollow,noreferrer">
            {commonName}
          </a>) : commonName}
          {totalSeen && (<span
            className="badge badge-outline badge-secondary"
            title="Total observed"
          >
            {totalSeen}
          </span>)}
          {showYear && (
            <span className="badge badge-outline badge-secondary">
              {firstSeen}
            </span>
          )}
          {showLocation && (
            <span className="badge badge-outline badge-secondary">
              location tk
            </span>
          )}
        </h2>
        <span className="sci-name">{scientificName}</span>
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
