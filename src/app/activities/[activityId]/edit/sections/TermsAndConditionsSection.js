"use client";

import { getActivity, patchProvider } from "@/app/api.mjs";
import { Button, Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { WYSIWYGEditor } from "../components/WYSIWYGEditor";
import "dayjs/locale/en-gb";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Error } from "../components/formikFields";
import { LgFlex, SmFlex } from "../components/responsiveFlexes";

function TermsAndConditionsModal({ setTermsCoditionsOpen }) {
  const activityId = useParams().activityId;
  const editorRef = useRef(null);

  const { data: activity } = useQuery(["activity", activityId], () => getActivity(activityId));
  const { data: provider } = useQuery(["provider", activity?.provider], () => patchProvider(activity?.provider));
  const mutation = useMutation((data) => patchProvider(activity?.provider, data));
  const [error, setError] = useState(null);

  function handleSave() {
    const content = editorRef.current.getContent();
    mutation.mutate(
      { termsAndConditions: content },
      {
        onError: (error) => setError(error?.response?.data?.termsAndConditions || error.message),
        onSuccess: () => {
          setError(null);
          setTermsCoditionsOpen(false);
        },
      }
    );
  }

  return (
    <TermsAndConditionsContainer>
      <Typography variant="h3" textAlign="center">
        Add your Terms & Contitions here
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 5 } }}>
        <WYSIWYGEditor initialValue={provider?.termsAndConditions} editorRef={editorRef} />
      </Box>
      <Error>{error}</Error>
      <SmFlex sx={{ mt: { xs: 2, md: 5 }, rowGap: 1, columnGap: 5, justifyContent: "right", alignItems: "center" }}>
        <Button
          variant="outlined"
          color="grey"
          size="large"
          onClick={() => setTermsCoditionsOpen(false)}
          fullWidth
          sx={{ maxWidth: 230 }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="green" size="large" fullWidth sx={{ maxWidth: 230 }}>
          Save
        </Button>
      </SmFlex>
    </TermsAndConditionsContainer>
  );
}

export default function TermsAndConditionsSection(sx) {
  const [termsCoditionsOpen, setTermsCoditionsOpen] = React.useState(false);

  return (
    <LgFlex sx={{ my: 10, columnGap: 5, rowGap: 1, justifyContent: "center", alignItems: "center", ...sx }}>
      <Typography variant="h5">Terms and Conditions</Typography>
      <Button
        variant="contained"
        color="yellow"
        onClick={() => setTermsCoditionsOpen(true)}
        sx={{ width: "100%", maxWidth: 340 }}
      >
        Click to edit
      </Button>

      <Dialog
        onClose={() => setTermsCoditionsOpen(false)}
        open={termsCoditionsOpen}
        PaperProps={{ sx: { maxWidth: "none" } }}
      >
        <TermsAndConditionsModal {...{ setTermsCoditionsOpen }} />
      </Dialog>
    </LgFlex>
  );
}

export const TermsAndConditionsContainer = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    minWidth: { xs: 300, md: 500 },
    minHeight: 150,
    px: { xs: 2.5, md: 7 },
    py: { xs: 3, md: 5 },
    overflow:"hidden"
  })
);
