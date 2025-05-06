import { LatLngExpression } from "leaflet";

// Alt map: "https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png"
export const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_ATTRIBUTION = `&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;

export const DEFAULT_CENTER: LatLngExpression = [47.6, -122.33]; // Seattle
export const DEFAULT_ZOOM = 9;

export const RESET_CENTER: LatLngExpression = [0, 0];
export const RESET_ZOOM = 2;

export const DEFAULT_ANIMATION_OPTIONS = {
  animate: true,
  duration: 0.5,
};
