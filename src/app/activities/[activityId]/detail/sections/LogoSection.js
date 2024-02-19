"use client";

import {Box, Container} from "@mui/system";
import Image from "next/image";
import React from "react";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {getActivity} from "@/app/activities/[activityId]/detail/api.mjs";

export default function ProviderLogo() {
  const activityId = useParams().activityId;
  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));

  const imageSrc = activity && activity.providerLogo ? activity.providerLogo : "/default_logo.png";

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Box
        sx={{
        display: "flex",
        justifyContent: { xs: "center", lg: "left" },
      }}>
        <Image
          src={imageSrc}
          alt="School"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "auto", maxWidth: 540 }}
        />
      </Box>
    </Container>
  );
}