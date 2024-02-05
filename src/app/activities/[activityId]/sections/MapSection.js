"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import { getActivity, patchActivity } from "@/app/activities/[activityId]/api.mjs";
import Box from "@mui/material/Box";
import { Map } from "@/app/activities/[activityId]/components/Map";
import { Container } from "@mui/material";
import { Errors } from "@/app/activities/[activityId]/components/formikFields";

export function MapSection() {
  const activityId = useParams().activityId;

  const londonCoordinates = { lat: 51.5074, lng: -0.1278 };
  const [coordinates, setCoordinates] = useState(londonCoordinates);
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState([]);
  const [addressError, setAddressError] = useState("")

  const queryClient = useQueryClient();
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const mutation = useMutation((data) => patchActivity(activityId, data));

  useEffect(() => {
    // Synchronizes the map's coordinates and address with the fetched activity data,
    // ensuring the map correctly represents the current activity's location.
    if (activity) {
      const { latitude, longitude, address: activityAddress } = activity;
      setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      setAddress(activityAddress || "");
    }
  }, [activity]);

  async function handleSubmit() {
    const data = { latitude: coordinates.lat, longitude: coordinates.lng, address };
    mutation.mutate(data, {
      onSuccess: (updatedActivity) => {
        queryClient.setQueryData(["activity", activityId], updatedActivity);
        setErrors([]);
        setAddressError("");
      },
      onError: (error) => {
        const drfErrors = error.response?.data;
        const nonFieldErrors = error?.response?.data?.non_field_errors;

        if (drfErrors) setErrors(Object.values(drfErrors));
        if (drfErrors.address) {
          setAddressError(drfErrors.address.join(" "));
          delete drfErrors.address;
          setErrors(Object.values(drfErrors))
        }
        else if (nonFieldErrors && nonFieldErrors.length > 0) setErrors(...nonFieldErrors);
        else setErrors([error.message]);
      },
    });
  }

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ mt: 2 }}>
        <Map
          coordinates={coordinates}
          address={address}
          addressError={addressError}
          setAddressError={setAddressError}
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          handleSubmit={handleSubmit}
        />
        {errors && <Errors errors={errors} />}
      </Box>
    </Container>
  );
}