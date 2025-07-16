import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker icon setup (same as before)
const iconRetinaUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const iconUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{ position: [number, number]; title: string }>;
  route?: [number, number][];
}

function MapComponent({
  center,
  zoom,
  markers = [],
  route = [],
}: MapComponentProps) {
  const [map, setMap] = useState<Map | null>(null);
  const mapRef = useRef<Map | null>(null);

  // Option 1: Using ref callback (recommended)
  const handleMapReady = useCallback((mapInstance: Map) => {
    mapRef.current = mapInstance;
    setMap(mapInstance);
  }, []);

  // Option 2: Using whenReady prop (alternative)
  // const handleMapReady = useCallback(() => {
  //   if (mapRef.current) {
  //     setMap(mapRef.current);
  //   }
  // }, []);

  useEffect(() => {
    if (map && center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      // Option 1: Using ref callback (recommended)
      ref={handleMapReady}

      // Option 2: Using whenReady (alternative)
      // ref={mapRef}
      // whenReady={handleMapReady}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
      {route.length > 0 && (
        <Polyline positions={route} color="blue" weight={5} opacity={0.7} />
      )}
    </MapContainer>
  );
}

export default MapComponent;
