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
