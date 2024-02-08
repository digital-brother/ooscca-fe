import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import { Button, TextField, useTheme } from "@mui/material";

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
const libraries = ["places"];

export function Map({ location, addressError, setAddressError, setLocation, handleSubmit }) {
  const { address, coordinates } = location;
  const [mapCenter, setMapCenter] = useState(coordinates);
  const [markerInfoOpened, setMarkerInfoOpened] = useState(!!address);

  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.querySelector("input").value = address || "";
    }
    if (coordinates) setMarkerInfoOpened(!!address);
  }, [address, coordinates]);

  const handleMapLoad = useCallback(() => {
    geocoderRef.current = new window.google.maps.Geocoder();
    if (coordinates) {
      setMapCenter(coordinates);
    }
  }, [coordinates]);

  const updateLocation = (newCoordinates, newAddress) => {
    setLocation({ coordinates: newCoordinates, address: newAddress });
  };

  const handleAddressType = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places?.[0] || null;

    if (place?.geometry) {
      const location = place.geometry.location;
      const newCoordinates = { lat: location.lat(), lng: location.lng() };
      updateLocation(newCoordinates, place.formatted_address);
      setMapCenter(newCoordinates);
      setAddressError("");
    } else {
      setAddressError("Please enter a valid location.");
    }
  };

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    const newCoordinates = { lat: latLng.lat(), lng: latLng.lng() };

    geocoderRef.current?.geocode({ location: latLng }, (foundAddresses, status) => {
      if (status === "OK" && foundAddresses[0]) {
        const newAddress = foundAddresses[0].formatted_address;
        updateLocation(newCoordinates, newAddress);
      } else {
        updateLocation(newCoordinates, null);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={libraries}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "start" }}>
          <Box sx={{ flex: 1 }}>
            <StandaloneSearchBox
              onLoad={(ref) => {
                searchBoxRef.current = ref;
              }}
              onPlacesChanged={handleAddressType}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Venue address"
                variant="outlined"
                defaultValue={address}
                ref={textFieldRef}
                error={!!addressError}
                helperText={addressError}
                sx={{ ".MuiOutlinedInput-notchedOutline": { borderColor: "black" } }}
              />
            </StandaloneSearchBox>
          </Box>
          <Button variant="contained" color="green" onClick={handleSubmit} sx={{ ml: 2 }}>
            Save
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <GoogleMap
            mapContainerStyle={{ height: 700 }}
            center={mapCenter}
            zoom={10}
            options={{
              draggableCursor: "pointer",
              clickableIcons: false,
            }}
            onLoad={handleMapLoad}
            onClick={handleMapClick}
          >
            {coordinates && !!coordinates.lat && !!coordinates.lng && (
              <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }}>
                {markerInfoOpened && address && (
                  <InfoWindow
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                    onCloseClick={() => setMarkerInfoOpened(false)}
                    sx={{ mr: 2 }}
                  >
                    <div>
                      <strong>{address}</strong>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </GoogleMap>
        </Box>
      </Box>
    </LoadScript>
  );
}
