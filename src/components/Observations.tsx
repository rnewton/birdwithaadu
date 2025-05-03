import { Observation as ObservationType } from "../types";
import Observation from './Observation';

import "./Observations.css";

type ObservationsProps = {
  observations: ObservationType[];
};

function Observations({ observations }: ObservationsProps) {
  return (
    <div className="observations">
      {observations.map((row) => (
        <Observation {...row} images={[]} key={row.id} />
      ))}
    </div>
  );
}

export default Observations;
