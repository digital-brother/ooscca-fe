import React, { useRef, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

const render = (status) => {
  if (status === Status.LOADING) return <Typography variant="h6">Loading...</Typography>;
  if (status === Status.FAILURE) return <Typography variant="h6" color={"error"}>Failed to load map</Typography>
  return null;
};

const MyMapComponent = ({ center, zoom, place }) => {
  const ref = useRef();
  const mapRef = useRef();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && ref.current) {
      mapRef.current = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }

    if (place && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      mapRef.current.setCenter(place.geometry.location);
      mapRef.current.fitBounds(bounds.extend(place.geometry.location));

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        map: mapRef.current,
        position: place.geometry.location,
      });
    }
  }, [ref, center, zoom, place]);

  return <Box ref={ref} sx={{ width: "100%", height: "100%" }} />;
};

export default function GoogleMapsWrapper(props) {
  const [inputValue, setInputValue] = useState("");
  const [place, setPlace] = useState(null);

  useEffect(() => {
    let autocomplete;
    if (window.google && !autocomplete) {
      autocomplete = new window.google.maps.places.AutocompleteService();
    }

    const handlePlaceSelect = (selectedPlace) => {
      setPlace(selectedPlace);
    };

    if (inputValue && autocomplete) {
      autocomplete.getPlacePredictions({ input: inputValue }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          // For simplicity, just select the first prediction
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ placeId: predictions[0].place_id }, (results, status) => {
            if (status === "OK") {
              handlePlaceSelect(results[0]);
            }
          });
        }
      });
    }
  }, [inputValue]);

  const center = { lat: -34.397, lng: 150.644 }; // Example coordinates
  const zoom = 8;

  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ width: "100%", height: 600, padding: 5, display: "flex", flexDirection: "column" }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={handleSearch}
          placeholder="Add venue address here"
          variant="outlined"
          sx={{ width: "70%", mr: 2, ".MuiOutlinedInput-notchedOutline": { borderColor: "black" } }}
        />
        <Button
          variant="text"
          onClick={() => {
            /* Function to handle directions */
          }}
          sx={{ color: "black", textDecoration: "underline" }}
        >
          Get directions
        </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%", position: "relative", mt: 2 }}>
        <Wrapper apiKey="AIzaSyCvRilixYTq-080gFVs6uWf_WybV-t8y-g" libraries={["places"]} render={(status) => render(status)}>
          <MyMapComponent center={center} zoom={zoom} place={place} />
        </Wrapper>
      </Box>
    </Box>
  );
}
