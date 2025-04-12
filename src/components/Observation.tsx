import { FaCamera } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";

import "./Observation.css";

type ObservationProps = {
  commonName: string;
  scientificName: string;
  firstSeen: string;
  totalSeen: number;
  notes: string;
  images: string[];
};

function Observation({
  commonName,
  scientificName,
  firstSeen,
  totalSeen,
  notes,
  images,
}: ObservationProps) {
  return (
    <div className="observation">
      <div>
        <h2 className="common-name">{commonName}</h2>
        <span className="sci-name">{scientificName}</span>
      </div>
      <div className="stats">
        <p
          className="badge badge-outline badge-primary tooltip"
          data-tip="First seen"
        >
          {firstSeen}
        </p>
        <p
          className="badge badge-outline badge-secondary tooltip"
          data-tip="Total seen"
        >
          {totalSeen}
        </p>
        {notes && (
          <div className="tooltip" data-tip={notes}>
            <FaNoteSticky />
          </div>
        )}
        {images.length > 0 && (
          <div className="tooltip" data-tip="View images (soon)">
            <FaCamera />
          </div>
        )}
      </div>
    </div>
  );
}

export default Observation;
