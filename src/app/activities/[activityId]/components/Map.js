import React, {useRef, useState, useCallback, useEffect} from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox, InfoWindow } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import {Button, TextField } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import {createHandleSubmit} from "@/app/activities/[activityId]/components/formikFields";
import {useParams} from "next/navigation";
import {useMutation, useQuery} from "react-query";
import {getActivity, patchActivity, patchProvider} from "@/app/activities/[activityId]/api.mjs";

// const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const MAP_API_KEY = "AIzaSyCvRilixYTq-080gFVs6uWf_WybV-t8y-g";

const libraries = ["places"];
const defaultMapLocation = {
  lat: 51.5074,
  lng: -0.1278,
};




export function MapComponent({ setFieldValue, initialCoordinates, initialAddress } ) {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(initialCoordinates || defaultMapLocation);
  const [infoOpen, setInfoOpen] = useState(!!initialAddress);
  const [selectedPlace, setSelectedPlace] = useState(initialAddress ? { formatted_address: initialAddress } : null);
  const [lastClickedMarker, setLastClickedMarker] = useState(null);
  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    // Set marker to initialCoordinates or defaultMapLocation
    setMarkerPosition(initialCoordinates || defaultMapLocation);

    // Set the address in the search box if initialAddress is provided
    if (initialAddress && textFieldRef.current) {
      textFieldRef.current.querySelector('input').value = initialAddress;
    }

    // If initialCoordinates are provided, update Formik fields
    if (initialCoordinates) {
      setFieldValue("latitude", initialCoordinates.latitude);
      setFieldValue("longitude", initialCoordinates.longitude);
    }

    // Update Formik field for address
    if (initialAddress) {
      setFieldValue("address", initialAddress);
    }
  }, [initialCoordinates, initialAddress, setFieldValue]);

  const handleMapLoad = useCallback((map) => {
  setMap(map);
  geocoderRef.current = new window.google.maps.Geocoder(); // Create the geocoder here
  if (initialCoordinates) {
    map.setCenter(new window.google.maps.LatLng(initialCoordinates.lat, initialCoordinates.lng));
  }
}, [initialCoordinates]);

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

      if (!isNaN(location.lat()) && !isNaN(location.lng())) {
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setFieldValue("latitude", location.lat());
        setFieldValue("longitude", location.lng());
      }
      setFieldValue("address", place.formatted_address);

      setSelectedPlace(null);
      setInfoOpen(false);

      setSelectedPlace({ formatted_address: place.formatted_address});
      setInfoOpen(true);

      if (map) {
        map.setZoom(15);
        map.panTo(location);
      }
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

    // Update Formik state
    setFieldValue("latitude", latLng.lat());
    setFieldValue("longitude", latLng.lng());

    // Reset InfoWindow content and visibility
    setSelectedPlace(null);
    setInfoOpen(false);

    if (geocoderRef.current) {
      geocoderRef.current.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          setSelectedPlace({ formatted_address: results[0].formatted_address });
          setInfoOpen(true);  // Reopen InfoWindow with new content

          setFieldValue("address", results[0].formatted_address);
        }
      });
    }
  };

  return (
    <Box sx={{ width: "100%", height: 700, padding: 5, display: "flex", flexDirection: "column" }}>
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
          <Box>
            <Button
              variant="text"
              sx={{ color: "black", textDecoration: "underline", "&:hover": { backgroundColor: "transparent" } }}
              // TODO: Implement "Get Directions" functionality here
            >
              Get directions
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "100%", mt: 2 }}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={initialCoordinates}
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
