import { Observation as ObservationType } from "../types";
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

function formatLocations(locations: string): string {
  const parts = new Set(locations.split(";"));

  // Remove anything that looks like lat/long
  const latLonRegex = /\(?-?\d{1,3}\.\d{4,},?\)?/g;

  const formatted = Array.from(parts)
    .map((part) => part.replace(latLonRegex, "").replace("Auto selected", "Incidental").trim())
    .filter((part) => part.length > 0)
    .join(", ");

  return formatted;
}

export default Observations;
