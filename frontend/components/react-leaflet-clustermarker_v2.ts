// This is a fixc copy-pasted from https://github.com/yuzhva/react-leaflet-markercluster/issues/187 because of Error: No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>
// Original message pasted below.

import 'leaflet.markercluster';
import {createPathComponent} from '@react-leaflet/core';
import L from 'leaflet';

const MarkerClusterGroup = createPathComponent(({children: _c, ...props}, ctx) => {
    const clusterProps: Record<string, any> = {};
    const clusterEvents: Record < string, any >= {};

    // Splitting props and events to different objects
    Object.entries(props).forEach(([propName, prop]) => propName.startsWith('on') ? (clusterEvents[propName] = prop)
        : (clusterProps[propName] = prop));

    // Creating markerClusterGroup Leaflet element
    const markerClusterGroup = L.markerClusterGroup(clusterProps);

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
        const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
        markerClusterGroup.on(clusterEvent, callback);
    });

    return {
        instance: markerClusterGroup,
        context: {...ctx, layerContainer: markerClusterGroup},
    };
});

export default MarkerClusterGroup;



/*
fasiha commented on Jun 18 •
This library is actually a pretty thin wrapper around leaflet.markercluster: I got it working after

npm install leaflet.markercluster that and then
gently converted the current react-leaflet-markercluster.js to this, in components/MakeClusterGroup.ts (just remove the handful of type definitions to convert to JS):
import 'leaflet.markercluster';
import {createPathComponent} from '@react-leaflet/core';
import L from 'leaflet';

const MarkerClusterGroup = createPathComponent(({children: _c, ...props}, ctx) => {
  const clusterProps: Record<string, any> = {};
  const clusterEvents: Record < string, any >= {};

  // Splitting props and events to different objects
  Object.entries(props).forEach(([propName, prop]) => propName.startsWith('on') ? (clusterEvents[propName] = prop)
                                                                                : (clusterProps[propName] = prop));

  // Creating markerClusterGroup Leaflet element
  const markerClusterGroup = L.markerClusterGroup(clusterProps);

  // Initializing event listeners
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    markerClusterGroup.on(clusterEvent, callback);
  });

  return {
    instance: markerClusterGroup,
    context: {...ctx, layerContainer: markerClusterGroup},
  };
});

export default MarkerClusterGroup;
Then here's my full components/myMap.tsx for completeness:

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "./MarkerClusterGroup";

interface MapStationsProps {
  latlons: [number, number][];
}
function MapStations({ latlons }: MapStationsProps) {
  const position = [51.505, -0.09] as [number, number];
  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ width: "100%", height: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MarkerClusterGroup> // <-------------------------------------- !
        {latlons.map((v, i) => (
          <Marker key={i} position={v} />
        ))}
      </MarkerClusterGroup> // <-------------------------------------- !
    </MapContainer>
  );
}
export default MapStations;
Working with

  "dependencies": {
    "leaflet": "^1.8.0",
    "leaflet.markercluster": "^1.5.3",
    "next": "^12.1.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-leaflet": "^4.0.0",
  },
 */