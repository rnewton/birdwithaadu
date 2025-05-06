import { renderToString } from "react-dom/server";
import L from "leaflet";
import { useMap, Marker as LM } from "react-leaflet";
import { FaBinoculars } from "react-icons/fa6";

import { DEFAULT_ANIMATION_OPTIONS, DEFAULT_ZOOM } from "../constants";
import { keysToLatLon } from "../types";

import "./Marker.css";

// Fix marker icon issue
const DefaultIcon = new L.DivIcon({
  html: renderToString(
    <div className="marker-pin">
      <FaBinoculars size={25} color="#213b67" />
    </div>
  ),
  iconSize: [25, 25],
  className: "observation-icon",
});

L.Marker.prototype.options.icon = DefaultIcon;

type MarkerProps = {
  children: React.ReactNode;
  positionKey: string;
};

function Marker({ children, positionKey }: MarkerProps) {
  const map = useMap();

  return (
    <LM
      position={keysToLatLon(positionKey)}
      eventHandlers={{
        click: (e) => {
          const zoom = map.getZoom();

          map.flyTo(e.target.getLatLng(), zoom < DEFAULT_ZOOM ? DEFAULT_ZOOM : zoom, DEFAULT_ANIMATION_OPTIONS);
        },
      }}
    >
      {children}
    </LM>
  );
}

export default Marker;
