import { useState } from "react";
import { Box, Drawer, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MapComponent from "../components/MapComponent";
import RoutePlanner from "../components/RoutePlanner";
import FavoriteLocations from "../components/FavoriteLocations";

function MapPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [route, setRoute] = useState<[number, number][]>([]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{ width: 350, flexShrink: 0 }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", p: 2 }}>
          <RoutePlanner onRouteCalculated={setRoute} />
          <FavoriteLocations onSelect={(coords) => console.log(coords)} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <IconButton
          color="inherit"
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{ position: "absolute", top: 70, left: 10, zIndex: 1000 }}
        >
          <MenuIcon />
        </IconButton>
        <MapComponent center={[35.68, 51.38]} zoom={13} route={route} />
      </Box>
    </Box>
  );
}

export default MapPage;
