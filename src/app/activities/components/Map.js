import React, {useRef, useEffect, useState, useCallback} from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {GoogleMap, Marker, LoadScript, StandaloneSearchBox} from "@react-google-maps/api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { Loader } from "@googlemaps/js-api-loader";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// const render = (status) => {
//   if (status === Status.LOADING) return <Typography variant="h6">Loading...</Typography>;
//   if (status === Status.FAILURE)
//     return (
//       <Typography variant="h6" color={"error"}>
//         Failed to load map
//       </Typography>
//     );
//   return null;
// };
//
// const MyMapComponent = ({ center, zoom, place }) => {
//   const ref = useRef();
//   const mapRef = useRef();
//   const markerRef = useRef(null);
//
//   useEffect(() => {
//     if (!mapRef.current && ref.current) {
//       mapRef.current = new window.google.maps.Map(ref.current, {
//         center,
//         zoom,
//       });
//     }
//
//     if (place && mapRef.current) {
//       mapRef.current.setCenter(place);
//       mapRef.current.setZoom(17);
//       // const bounds = new window.google.maps.LatLngBounds();
//       // mapRef.current.setCenter(place.geometry.location);
//       // mapRef.current.fitBounds(bounds.extend(place.geometry.location));
//
//       if (markerRef.current) {
//         markerRef.current.setMap(null);
//       }
//
//       markerRef.current = new window.google.maps.Marker({
//         map: mapRef.current,
//         // position: place.geometry.location,
//         position: place,
//       });
//     }
//   }, [ref, center, zoom, place]);
//
//   return <Box ref={ref} sx={{ width: "100%", height: "100%" }} />;
// };

// export default function GoogleMapsWrapper(props) {
//   // const [inputValue, setInputValue] = useState("");
//   // const [place, setPlace] = useState(null);
//   const [address, setAddress] = useState("");
//   const [coordinates, setCoordinates] = useState(null);
//
//   const handleSelect = async (address) => {
//     try {
//       const results = await geocodeByAddress(address);
//       const latLng = await getLatLng(results[0]);
//       setAddress(address);
//       setCoordinates(latLng);
//     } catch (error) {
//       console.error("Error", error);
//     }
//   };
//
//   const searchOptions = {
//     // Define search options here (optional)
//   };
//
//   useEffect(() => {
//     let autocomplete;
//     if (window.google && !autocomplete) {
//       autocomplete = new window.google.maps.places.AutocompleteService();
//     }
//
//     const handlePlaceSelect = (selectedPlace) => {
//       setPlace(selectedPlace);
//     };
//
//     if (inputValue && autocomplete) {
//       autocomplete.getPlacePredictions({ input: inputValue }, (predictions, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
//           // For simplicity, just select the first prediction
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ placeId: predictions[0].place_id }, (results, status) => {
//             if (status === "OK") {
//               handlePlaceSelect(results[0]);
//             }
//           });
//         }
//       });
//     }
//   }, [inputValue]);
//
//   const center = { lat: -34.397, lng: 150.644 }; // Example coordinates
//   const zoom = 8;
//
//   const handleSearch = (event) => {
//     setInputValue(event.target.value);
//   };
//
//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };
//
//   return (
//     <Box sx={{ width: "100%", height: 600, padding: 5, display: "flex", flexDirection: "column" }}>
//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <TextField
//           fullWidth
//           value={inputValue}
//           onChange={handleSearch}
//           placeholder="Add venue address here"
//           variant="outlined"
//           sx={{ width: "70%", mr: 2, ".MuiOutlinedInput-notchedOutline": { borderColor: "black" } }}
//         />
//         <Button
//           variant="text"
//           onClick={() => {
//             /* Function to handle directions */
//           }}
//           sx={{ color: "black", textDecoration: "underline" }}
//         >
//           Get directions
//         </Button>
//       </Box>
//       <Box sx={{ height: "100%", width: "100%", position: "relative", mt: 2 }}>
//         <Wrapper apiKey="AIzaSyCvRilixYTq-080gFVs6uWf_WybV-t8y-g" libraries={["places"]} render={(status) => render(status)}>
//           <MyMapComponent center={center} zoom={zoom} place={place} />
//         </Wrapper>
//       </Box>
//     </Box>
//   );
// }

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: -34.397,
  lng: 150.644,
};

export default function MyMapComponent() {
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
        lng: location.lng()
      });
      map.panTo(location);
    }
  };

  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <Box sx={{ width: '100%', height: 600, padding: 5, display: 'flex', flexDirection: 'column' }}>
      <LoadScript googleMapsApiKey="AIzaSyCvRilixYTq-080gFVs6uWf_WybV-t8y-g" libraries={["places"]}>
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <TextField
            fullWidth
            placeholder="Add venue address here"
            variant="outlined"
            sx={{ width: '70%', mr: 2, '.MuiOutlinedInput-notchedOutline': { borderColor: 'black' } }}
          />
        </StandaloneSearchBox>
        <Button
          variant="text"
          sx={{ color: 'black', textDecoration: 'underline' }}
          // Implement "Get Directions" functionality here
        >
          Get directions
        </Button>
        <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
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
