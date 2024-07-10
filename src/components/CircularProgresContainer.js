"use client";

import { Error } from "@/app/activities/[activityId]/edit/components/formikFields";
import { Container, CircularProgress } from '@mui/material';

export default function CircularProgresContainer({ loading, mutation }) {
return (
    <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
    {loading ? (
    <CircularProgress />
    ) : (
    <Error>{mutation.isError && mutation.error.message}</Error>
    )}
    </Container>
  );
}
