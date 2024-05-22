"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import { useMutation } from "react-query";
import { Error } from "@/app/activities/[activityId]/edit/components/formikFields";
import { Container, CircularProgress } from '@mui/material';
import { emailConfirmation } from "@/app/api.mjs";

export default function EmailConfirmation({params}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const mutation = useMutation(emailConfirmation);
  const { confirmationKey } = params;
  const decodedKey = decodeURIComponent(confirmationKey);

  const confirmEmail = () => {
    mutation.mutate({ key: decodedKey }, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: () => {
        setLoading(false)
      }
    }
    );
  };

  useEffect(() => {
    confirmEmail();
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
