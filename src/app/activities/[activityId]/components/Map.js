import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
const libraries = ["places"];

export function Map({ coordinates, address, addressError, setAddressError, setCoordinates, setAddress, handleSubmit }) {
  const [mapCenter, setMapCenter] = useState(coordinates);
  const [marker, setMarker] = useState({
    infoOpen: !!address,
  });
  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.querySelector("input").value = address || "";
    }
    if (coordinates) {
      setMarker((previousMarker) => ({
        ...previousMarker,
        infoOpen: !!address,
      }));
    }
  }, [address, coordinates]);

  const handleMapLoad = useCallback(() => {
    geocoderRef.current = new window.google.maps.Geocoder();
    if (coordinates) {
      setMapCenter(coordinates);
    }
  }, [coordinates]);

  const onLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  
  const updateMarkerAndInfo = (newCoordinates, newAddress) => {
    setMarker((previousMarker) => ({
      ...previousMarker,
      infoOpen: !!newAddress,
    }));
    setCoordinates(newCoordinates);
    setAddress(newAddress);
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places && places.length > 0 ? places[0] : null;

    if (place && place.geometry) {
      const location = place.geometry.location;
      const newCoordinates = {
        lat: location.lat(),
        lng: location.lng(),
      };
      updateMarkerAndInfo(newCoordinates, place.formatted_address);
      setMapCenter(newCoordinates);
      setAddressError("");
    } else {
      setAddressError("Please enter a valid location.");
    }
  };

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    const newCoordinates = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    if (geocoderRef.current) {
      geocoderRef.current.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const newAddress = results[0].formatted_address;
          updateMarkerAndInfo(newCoordinates, newAddress);
        } else {
          updateMarkerAndInfo(newCoordinates, null);
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={libraries}>
      <Box sx={{ width: "100%", height: 700, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
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
        <Box sx={{ width: "100%", height: "100%", mt: 2 }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={10}
            options={{
              draggableCursor: "pointer",
              clickableIcons: false,
            }}
            onLoad={handleMapLoad}
            onClick={handleMapClick}
          >
            {coordinates && !isNaN(coordinates.lat) && !isNaN(coordinates.lng) && (
              <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }}>
                {marker.infoOpen && address && (
                  <InfoWindow
                    position={{ lat: coordinates.lat, lng: coordinates.lng }}
                    onCloseClick={() => setMarker((previousMarker) => ({ ...previousMarker, infoOpen: false }))}
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
