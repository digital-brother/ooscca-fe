import React, {useRef, useState, useCallback, useEffect} from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import {Button, TextField } from "@mui/material";

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
const libraries = ["places"];

export function MapComponent({ setCoordinates, setAddress, initialCoordinates, initialAddress } ) {
  const [map, setMap] = useState(null);
  const [markerState, setMarkerState] = useState({
    position: initialCoordinates,
    infoOpen: !!initialAddress,
    selectedPlace: initialAddress ? { formatted_address: initialAddress } : null,
    lastClickedMarker: null,
  });
  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.querySelector('input').value = initialAddress || '';
    }
  }, [initialAddress]);

  const handleMapLoad = useCallback((map) => {
    setMap(map);
    geocoderRef.current = new window.google.maps.Geocoder();
    if (initialCoordinates) {
      const initialLatLng = new window.google.maps.LatLng(initialCoordinates.lat, initialCoordinates.lng);
      map.setCenter(initialLatLng);
      setMarkerState((prev) => ({
        ...prev,
        position: initialCoordinates,
        infoOpen: !!initialAddress,
        selectedPlace: initialAddress ? { formatted_address: initialAddress } : null,
      }));
      setCoordinates(initialCoordinates);
      setAddress(initialAddress);
    }
  }, [initialCoordinates, initialAddress, setCoordinates, setAddress]);

  const onLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const updateMarkerAndInfo = (newCoordinates, newAddress) => {
    setMarkerState({
      position: newCoordinates,
      infoOpen: !!newAddress,
      selectedPlace: newAddress ? { formatted_address: newAddress } : null,
      lastClickedMarker: null,
    });
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
      if (map) {
        map.setZoom(15);
        map.panTo(location);
      }
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
          // If geocode was not successful, set marker without address
          updateMarkerAndInfo(newCoordinates, null);
        }
      });
    }
  };

  return (
    <Box sx={{ width: "100%", height: 700, display: "flex", flexDirection: "column" }}>
      <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={libraries}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ width: "65%", mr: 2 }}>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
              <TextField
                fullWidth
                placeholder="Venue address"
                variant="outlined"
                ref={textFieldRef}
                sx={{ ".MuiOutlinedInput-notchedOutline": { borderColor: "black" } }}
              />
            </StandaloneSearchBox>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "100%", mt: 2 }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={markerState.position}
            zoom={10}
            onLoad={handleMapLoad}
            onClick={handleMapClick}
          >
            {markerState.position && !isNaN(markerState.position.lat) && !isNaN(markerState.position.lng) && (
              <Marker position={{ lat: markerState.position.lat, lng: markerState.position.lng }}>
                {markerState.infoOpen && markerState.selectedPlace && (
                  <InfoWindow position={{ lat: markerState.position.lat, lng: markerState.position.lng }} onCloseClick={() => setMarkerState(prev => ({ ...prev, infoOpen: false }))}>
                    <div>
                      <strong>{markerState.selectedPlace.formatted_address}</strong>
                      <p>
                        Coords: {markerState.position.lat.toFixed(3)}, {markerState.position.lng.toFixed(3)}
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