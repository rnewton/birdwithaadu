import { formatLocations, Observation as ObservationType } from "../types";
import Observation from './Observation';

import "./Observations.css";

type ObservationsProps = {
  observations: ObservationType[];
};

function Observations({ observations }: ObservationsProps) {
  if (!observations || observations.length === 0) {
    return <div className="observations">No observations found.</div>;
  }

  return (
    <div className="observations">
      <h1 className="header">
        {formatLocations(observations[0].locations)}
      </h1>
      {observations.map((row) => (
        <Observation {...row} images={[]} key={row.id} />
      ))}
    </div>
  );
}

export default Observations;
