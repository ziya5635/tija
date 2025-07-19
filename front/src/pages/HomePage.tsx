import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to GeoMapper
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Explore and save your favorite locations
      </Typography>
      <Button variant="contained" component={Link} to="/login" sx={{ mr: 2 }}>
        Login
      </Button>
      <Button variant="outlined" component={Link} to="/register">
        Register
      </Button>
    </Box>
  );
}

export default HomePage;
