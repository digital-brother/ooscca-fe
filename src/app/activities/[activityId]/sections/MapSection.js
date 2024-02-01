"use client";

import {useParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "react-query";
import React, {useEffect, useState} from "react";
import {getActivity, patchActivity} from "@/app/activities/[activityId]/api.mjs";
import Box from "@mui/material/Box";
import {MapComponent} from "@/app/activities/[activityId]/components/Map";
import {Button, Container} from "@mui/material";
import {Errors} from "@/app/activities/[activityId]/components/formikFields";

export function MapSection() {
  const defaultCoordinates = { lat: 51.5074, lng: -0.1278 };
  const activityId = useParams().activityId;
  const queryClient = useQueryClient();
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const [errors, setErrors] = useState([]);

  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [address, setAddress] = useState('');

  const mutation = useMutation((data) => patchActivity(activityId, data));

  useEffect(() => {
    // Synchronizes the map's coordinates and address with the fetched activity data,
    // ensuring the map correctly represents the current activity's location.
    if (activity) {
      const { latitude, longitude, address: activityAddress } = activity;
      setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      setAddress(activityAddress || '');
    }
  }, [activity]);

  async function handleSubmit() {
    const data = { latitude: coordinates.lat, longitude: coordinates.lng, address };
    mutation.mutate(data, {
      onSuccess: () => {
        console.log("Success")
        queryClient.invalidateQueries(['activity', activityId]);
        setErrors([]);
      },
      onError: (error) => {
        let errorMessages = [];
        const drfErrors = error.response?.data;
        const nonFieldErrors = error?.response?.data?.non_field_errors;

        if (drfErrors && typeof drfErrors === 'object') {
          errorMessages = Object.entries(drfErrors).flatMap(([field, errors]) => {
            return errors.map((error) => `${field}: ${error}`);
          });
        } else if (nonFieldErrors && nonFieldErrors.length > 0) {
          errorMessages.push(...nonFieldErrors);
        } else {
          errorMessages.push(error.message || 'An unexpected error occurred');
        }
        setErrors(errorMessages);
      },
    });
  }

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{mt: 2}}>
        <MapComponent
          initialCoordinates={coordinates}
          initialAddress={address}
          setCoordinates={setCoordinates}
          setAddress={setAddress}
        />
        <Button variant="contained" color="green" size="large" type="submit" onClick={handleSubmit} sx={{mt:2}}>
          Save
        </Button>
        {errors && <Errors errors={errors} />}
      </Box>
    </Container>
  );
}
