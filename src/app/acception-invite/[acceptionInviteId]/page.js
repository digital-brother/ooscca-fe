"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "react-query";
import { shareCalendarBack } from "@/app/api.mjs";
import { useSnackbar } from 'notistack';
import CircularProgresContainer from "@/components/CircularProgresContainer";

export default function ShareCalendarBack({ params }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const { acceptionInviteId } = params;
  const searchParams = useSearchParams()
 
  const status = searchParams.get('status')
  const mutation = useMutation((data) => shareCalendarBack(acceptionInviteId, data));

  useEffect(() => {
    mutation.mutate({ status }, {
      onSuccess: () => {
        enqueueSnackbar(`The request to share back the calendar was ${status} successfully!`, { variant: "success"});
        router.push("/booking");
      },
      onError: () => {
        setLoading(false);
      }
    }
    );
  }, []);

  return (
    <CircularProgresContainer loading={loading} mutation={mutation} />
  );
};
