"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import {
  getProvider,
  patchProvider,
  TEST_PROVIDER_ID,
} from "@/app/activities/api.mjs";

function LogoInput({ setFiles }) {
  const mutation = useMutation((file) => patchProvider(TEST_PROVIDER_ID, null, file));

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          }),
        ),
      );
      mutation.mutate(acceptedFiles[0]);
    },
    multiple: false,
  });

  return (
    <Box
      {...getRootProps({
        sx: {
          bgcolor: "#DEE2E6",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        },
      })}
    >
      <input {...getInputProps()} />

      <Typography sx={{ fontWeight: 700 }}>
        Drop your logo file here or &nbsp;
        <span style={{ cursor: "pointer", color: "#B01FB8" }}>browse</span>
      </Typography>

      <Typography variant="caption">
        Max. file size: 5MB &nbsp;&nbsp;&nbsp;&nbsp; Dimension: 000 x 000px
      </Typography>
    </Box>
  );
}

function LogoPreview({ files, setConfirmDelete }) {
  function showLogoDeleteConfirmation() {
    setConfirmDelete(true);
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {files.map((file) => (
        <Box
          component="img"
          src={file.url}
          alt="Preview"
          sx={{ objectFit: "contain", width: "100%", height: "100%" }}
          onLoad={() => URL.revokeObjectURL(file.url)}
          key={file.url}
        />
      ))}
      <IconButton
        onClick={showLogoDeleteConfirmation}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
}

function LogoDeleteConfirm({ setFiles, setConfirmDelete }) {
  const mutation = useMutation(() => patchProvider(TEST_PROVIDER_ID, {'logo': ''}))

  function logoDeleteConfirm() {
    setFiles([]);
    setConfirmDelete(false);
    mutation.mutate();
  }

  function logoDeleteCancel() {
    setConfirmDelete(false);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontWeight: 700, marginBottom: 2 }}>
        Are you sure you want to delete the file?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "75%",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={logoDeleteCancel}
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            mr: 1,
            "&:hover": {
              bg: "rgba(0, 0, 0, 0.04)",
              borderColor: "black",
            },
            "&:active": {
              bg: "rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={logoDeleteConfirm}
          sx={{
            flexGrow: 1,
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}

export default function DropZoneLogoUpload(props) {
  const [files, setFiles] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState();

  const {
    data: provider,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["provider", TEST_PROVIDER_ID],
    queryFn: () => getProvider(TEST_PROVIDER_ID),
  });

  useEffect(() => {
    if (!isLoading && !isError && provider.logo) {
      setFiles([{ url: provider.logo }]);
    }
  }, [provider, isLoading, isError]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.url));
  }, []);

  return (
    <Box
      sx={{
        width: 380,
        height: 110,
        borderRadius: 1.5,
        border: "1px #ADB5BD solid",
        overflow: "hidden",
      }}
    >
      {confirmDelete && (
        <LogoDeleteConfirm
          setFiles={setFiles}
          setConfirmDelete={setConfirmDelete}
        />
      )}
      {files.length === 0 && <LogoInput setFiles={setFiles} />}
      {files.length !== 0 && (
        <LogoPreview files={files} setConfirmDelete={setConfirmDelete} />
      )}
    </Box>
  );
}
