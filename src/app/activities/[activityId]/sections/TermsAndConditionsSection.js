"use client";

import { getActivity, patchProvider } from "@/app/activities/[activityId]/api.mjs";
import { Button, Dialog, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Editor } from "@tinymce/tinymce-react";
import "dayjs/locale/en-gb";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { LgFlex, SmFlex } from "../components/responsiveFlexes";
import { Error } from "../components/formikFields";

function TermsAndConditionsModal({ setTermsCoditionsOpen }) {
  const activityId = useParams().activityId;
  const editorRef = useRef(null);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
    <Box
      sx={{
        minWidth: { xs: 300, md: 500 },
        minHeight: { xs: 300, md: 200 },
        px: { xs: 2.5, md: 7 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Typography variant="h3" textAlign="center">
        Add your Terms & Contitions here
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 5 } }}>
        {/* Component is not controlled here for performance reasons
        (https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-controlled-component) */}
        <Editor
          initialValue={provider?.termsAndConditions}
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          toolbarMode="floating"
          // inline={true}
          init={{
            height: mdUp ? 500 : 350,
            menubar: false,
            statusbar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat",
            toolbar_mode: "floating",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
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
    </Box>
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
