export type Observation = {
  id: number;
  // Country: string;
  // State: string;
  // County: string;
  unit: string;
  firstSeen: number;
  commonName: string;
  scientificName: string;
  totalSeen: number;
  notes: string;
  // ChecklistComments: string;
  // Locations: string;
  lon: number;
  lat: number;
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
