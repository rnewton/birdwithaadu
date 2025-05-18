export type Observation = {
  id: number;
  country: string;
  state: string;
  // County: string;
  unit: string;
  firstSeen: number;
  commonName: string;
  scientificName: string;
  totalSeen: number;
  notes: string;
  // ChecklistComments: string;
  locations: string;
  lon: number;
  lat: number;
  ebirdURL: string;
};

export type LatLon = [number, number];
export type GroupedObservations = Map<number, Map<string, Observation[]>>;

export const latLonKey = (lat: number, lon: number): string => {
  return `${lat.toPrecision(5)},${lon.toPrecision(5)}`;
};
export const keysToLatLon = (key: string): LatLon => {
  const [lat, lon] = key.split(",").map(Number);
  return [lat, lon];
};

export const formatLocations = (locations: string): string => {
  const parts = new Set(locations.split(";"));

  // Remove anything that looks like lat/long
  const latLonRegex = /\(?-?\d{1,3}\.\d{4,},?\)?/g;

  const formatted = Array.from(parts)
    .map((part) =>
      part
        .replace(latLonRegex, "")
        .replace("Auto selected", "Incidental")
        .trim()
    )
    .filter((part) => part.length > 0)
    .join(", ");

  return formatted;
};
