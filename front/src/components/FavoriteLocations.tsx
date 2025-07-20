import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { Star, Delete, Add } from "@mui/icons-material";
import axios from "../axios";
import { useStore } from "../state/hooks/useStore";
import type { Props } from "../types";

interface FavoriteLocation {
  _id: string;
  name: string;
  geometry: {
    coordinates: [number, number];
  };
  address: string;
}
type FavoriteLocationProps = {
  onSelect: (coords: [number, number]) => void;
};

function FavoriteLocations({ onSelect }: Props<FavoriteLocationProps>) {
  const { user } = useStore();
  //solve this favorites issue first
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newFavorite, setNewFavorite] = useState({
    name: "",
    lat: "",
    lng: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      // fetchFavorites();
    }
  }, [user]);

  async function fetchFavorites() {
    try {
      const response = await axios.get("/locations/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }

  async function addFavorite() {
    try {
      await axios.post(
        "/locations",
        {
          name: newFavorite.name,
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(newFavorite.lng),
              parseFloat(newFavorite.lat),
            ],
          },
          address: newFavorite.address,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchFavorites();
      setOpenDialog(false);
      setNewFavorite({ name: "", lat: "", lng: "", address: "" });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  }

  const deleteFavorite = async (id: string) => {
    try {
      await axios.delete(`/locations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchFavorites();
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setOpenDialog(true)}
        fullWidth
      >
        Add Favorite Location
      </Button>

      <List>
        {favorites.map((fav) => (
          <ListItem key={fav._id}>
            <IconButton onClick={() => onSelect(fav.geometry.coordinates)}>
              <Star color="primary" />
            </IconButton>
            <ListItemText
              primary={fav.name}
              secondary={
                fav.address ||
                `${fav.geometry.coordinates[1].toFixed(
                  4
                )}, ${fav.geometry.coordinates[0].toFixed(4)}`
              }
            />
            <IconButton edge="end" onClick={() => deleteFavorite(fav._id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Favorite Location</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newFavorite.name}
            onChange={(e) =>
              setNewFavorite({ ...newFavorite, name: e.target.value })
            }
          />
          <TextField
            label="Latitude"
            fullWidth
            margin="normal"
            value={newFavorite.lat}
            onChange={(e) =>
              setNewFavorite({ ...newFavorite, lat: e.target.value })
            }
          />
          <TextField
            label="Longitude"
            fullWidth
            margin="normal"
            value={newFavorite.lng}
            onChange={(e) =>
              setNewFavorite({ ...newFavorite, lng: e.target.value })
            }
          />
          <TextField
            label="Address (optional)"
            fullWidth
            margin="normal"
            value={newFavorite.address}
            onChange={(e) =>
              setNewFavorite({ ...newFavorite, address: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addFavorite}
            style={{ marginTop: "16px" }}
            disabled={!newFavorite.name || !newFavorite.lat || !newFavorite.lng}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FavoriteLocations;
