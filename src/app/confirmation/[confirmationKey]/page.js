"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { verifyEmail, SIGNUP_CURRENT_STEP_KEY, USER_ID_KEY } from "@/app/api.mjs";
import CircularProgresContainer from "@/components/CircularProgresContainer"

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
    <CircularProgresContainer loading={loading} mutation={mutation} />
  );
};
