import { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import LocationSearch from "./LocationSearch";
import axios from "axios";
import { type Props } from "../types";

interface RoutePlanner {
  onRouteCalculated: (route: [number, number][]) => void;
}

function RoutePlanner({ onRouteCalculated }: Props<RoutePlanner>) {
  const [start, setStart] = useState<{ lat: number; lon: number } | null>(null);
  const [end, setEnd] = useState<{ lat: number; lon: number } | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);

  async function calculateRoute() {
    if (!start || !end) return;

    try {
      const response = await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const coordinates = response.data.routes[0].geometry.coordinates;
        // OSRM returns [lon, lat], we need [lat, lon] for Leaflet
        const formattedRoute = coordinates.map((coord: [number, number]) => [
          coord[1],
          coord[0],
        ]) as [number, number][];
        setRoute(formattedRoute);
        onRouteCalculated(formattedRoute);
      }
    } catch (error) {
      console.error("Routing error:", error);
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Route Planner
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">Start Location</Typography>
        <LocationSearch onSelectLocation={setStart} />
        {start && (
          <Typography variant="body2">
            Selected: {start.lat.toFixed(4)}, {start.lon.toFixed(4)}
          </Typography>
        )}
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle1">End Location</Typography>
        <LocationSearch onSelectLocation={setEnd} />
        {end && (
          <Typography variant="body2">
            Selected: {end.lat.toFixed(4)}, {end.lon.toFixed(4)}
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={calculateRoute}
        disabled={!start || !end}
      >
        Calculate Route
      </Button>
    </Box>
  );
}

export default RoutePlanner;
