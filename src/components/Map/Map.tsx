import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  FunctionComponent,
} from "react";
import { Context } from "../../store/Store";
import mapboxgl from "mapbox-gl";

/* Types */
import { AppContext } from "../../store/initial-state";
import { Event } from "../../models/Event";

/* Components */
import { EventPin } from "./EventPin/EventPin";

/* Styles */
import "mapbox-gl/dist/mapbox-gl.css";
import "./_map.scss";

/**
 * Map component
 *
 * @example
 * <Map />
 */
export const Map: FunctionComponent = () => {
  const [context] = useContext<AppContext | any>(Context);
  const [map, setMap] = useState(null);
  const [events, setEvents] = useState<Array<Event>>(context.events);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  /* Life Cycle */
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    function initializeMap({ setMap, mapContainer }) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v11", // stylesheet location
        center: [context.center.lng, context.center.lat],
        zoom: 12,
      });

      // Add geolocate control to the map.
      const controlOptions = {
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
      };
      const geoLocateControl = new mapboxgl.GeolocateControl(controlOptions);
      map.addControl(geoLocateControl);

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    }

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div
      id="ea-map"
      ref={(el: HTMLDivElement) => (mapContainer.current = el)}
    ></div>
  );
};
