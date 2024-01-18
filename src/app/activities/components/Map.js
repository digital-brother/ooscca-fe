import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from "@react-google-maps/api";
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
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [lastClickedMarker, setLastClickedMarker] = useState(null);
  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);

  const handleMapLoad = useCallback((map) => {
    setMap(map);
    geocoderRef.current = new window.google.maps.Geocoder(); // Create the geocoder here
  }, []);

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

      setSelectedPlace({ formatted_address: place.formatted_address, geometry: { location: location } });
      setInfoOpen(true);

      if (map) {
        map.setZoom(15);
        map.panTo(location);
      }
    }

    if (map) {
      // Set a closer zoom level, for example, 15
      map.setZoom(15);
      map.panTo(location);
    }
  };

  const handleMarkerClick = (markerLatLng) => {
    if (lastClickedMarker && lastClickedMarker.lat === markerLatLng.lat && lastClickedMarker.lng === markerLatLng.lng) {
      // Remove marker if the same one is clicked again
      setMarkerPosition(null);
      setInfoOpen(false);
      setSelectedPlace(null);
      setLastClickedMarker(null);
    } else {
      setLastClickedMarker(markerLatLng);
    }
  };

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    setMarkerPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
    setLastClickedMarker({ lat: latLng.lat(), lng: latLng.lng() });

    if (geocoderRef.current) {
      geocoderRef.current.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          setSelectedPlace({ formatted_address: results[0].formatted_address });
          setInfoOpen(true);
          console.log(results[0].formatted_address);
        }
      });
    }
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
            onLoad={handleMapLoad}
            onClick={handleMapClick}
          >
            {markerPosition && (
              <Marker position={markerPosition} onClick={() => handleMarkerClick(markerPosition)}>
                {infoOpen && selectedPlace && (
                  <InfoWindow position={markerPosition} onCloseClick={() => setInfoOpen(false)}>
                    <div>
                      <strong>{selectedPlace.formatted_address}</strong>
                      <p>
                        Coords: {markerPosition.lat.toFixed(3)}, {markerPosition.lng.toFixed(3)}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </GoogleMap>
        </Box>
      </LoadScript>
    </Box>
  );
}
