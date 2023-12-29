import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const defaultMapLocation = {
  lat: 51.5074,
  lng: -0.1278,
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const searchBoxRef = useRef(null);

  const onLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places && places.length > 0 ? places[0] : null;

    if (place && place.geometry) {
      const location = place.geometry.location;
      setMarkerPosition({
        lat: location.lat(),
        lng: location.lng(),
      });
      map.panTo(location);
    }
  };

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <Box sx={{ width: "100%", height: 700, padding: 5, display: "flex", flexDirection: "column" }}>
      <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={["places"]}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ width: "65%", mr: 2 }}>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
              <TextField
                fullWidth
                placeholder="Add venue address here"
                variant="outlined"
                sx={{ ".MuiOutlinedInput-notchedOutline": { borderColor: "black" } }}
              />
            </StandaloneSearchBox>
          </Box>
          <Box>
            <Button
              variant="text"
              sx={{ color: "black", textDecoration: "underline", "&:hover": { backgroundColor: "transparent" } }}
              // TODO:Implement "Get Directions" functionality here
            >
              Get directions
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "100%", mt: 2 }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={defaultMapLocation}
            zoom={10}
            onLoad={setMap}
            onClick={handleMapClick}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </Box>
      </LoadScript>
    </Box>
  );
}
