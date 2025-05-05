import "./Observation.css";

type ObservationProps = {
  commonName: string;
  scientificName: string;
  firstSeen: number;
  totalSeen: number;
  notes: string;
  images: string[];
  ebirdURL: string;
};

function Observation({
  commonName,
  scientificName,
  totalSeen,
  notes,
  ebirdURL,
}: ObservationProps) {
  return (
    <div className="observation">
      <div>
        <h2 className="common-name">
          <a href={ebirdURL} target="_blank" rel="nofollow,noreferrer">{commonName}</a>
          <span
          className="badge badge-outline badge-secondary tooltip"
          data-tip="Total observed"
        >
          {totalSeen}
        </span>
        </h2>
        <span className="sci-name">{scientificName}</span>
        
      </div>
      <div className="stats">        
        {notes && (
          <div>
            {notes}
          </div>
        )}
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
