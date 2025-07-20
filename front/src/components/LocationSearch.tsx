import { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
} from "@mui/material";
import axios from "../axios";
import type { Props } from "../types";

interface LocationSearch {
  onSelectLocation: (location: {
    lat: number;
    lon: number;
    display_name: string;
  }) => void;
}

function LocationSearch({ onSelectLocation }: Props<LocationSearch>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      {results.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          <List>
            {results.map((result, index) => (
              <ListItem
                key={index}
                component="div"
                disablePadding // Optional: removes default padding
              >
                <ListItemButton
                  onClick={() => {
                    onSelectLocation({
                      lat: parseFloat(result.lat),
                      lon: parseFloat(result.lon),
                      display_name: result.display_name,
                    });
                    setResults([]);
                    setQuery(result.display_name);
                  }}
                >
                  <ListItemText primary={result.display_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

export default LocationSearch;
