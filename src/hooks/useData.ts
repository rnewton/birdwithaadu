import { useEffect, useState } from "react";
import Papa from "papaparse";

import { Observation, GroupedObservations, latLonKey } from "../types";

function useData() {
  const [data, setData] = useState<GroupedObservations>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/summary.csv");
      const text = await response.text();
      const parsedData = Papa.parse<Observation>(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      // Iterate over the list and group the observations by year and lat/lon
      const groupedData = parsedData.data.reduce(
        (acc: GroupedObservations, row: Observation) => {
          if (!acc.has(row.firstSeen)) {
            acc.set(row.firstSeen, new Map());
          }

          const key = latLonKey(row.lat, row.lon);
          if (!acc.get(row.firstSeen)?.has(key)) {
            acc.get(row.firstSeen)?.set(key, []);
          }
          acc.get(row.firstSeen)?.get(key)?.push(row);

          return acc;
        },
        new Map()
      );

      setData(groupedData);
    };
    fetchData();
  }, []);

  return data;
}

export default useData;
