import { Box, Typography, Avatar, Button } from "@mui/material";
import { useStore } from "../state/hooks/useStore";

function ProfilePage() {
  const { user, logout } = useStore();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6">{user?.username}</Typography>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Email: {user?.email}
      </Typography>
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}

export default ProfilePage;
