"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { Error } from "@/app/activities/[activityId]/edit/components/formikFields";
import { Container, CircularProgress } from '@mui/material';
import { verifyEmail, SIGNUP_CURRENT_STEP_KEY, USER_ID_KEY } from "@/app/api.mjs";

export default function VerifyEmail({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const mutation = useMutation(verifyEmail);
  const { confirmationKey } = params;
  const decodedKey = decodeURIComponent(confirmationKey);

  useEffect(() => {
    mutation.mutate({ key: decodedKey }, {
      onSuccess: () => {
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(SIGNUP_CURRENT_STEP_KEY);
        router.push("/login");
      },
      onError: () => {
        setLoading(false)
      }
    }
    );
  }, []);

  return (
    <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Error>{mutation.isError && mutation.error.message}</Error>
      )}
    </Container>
  );
};
