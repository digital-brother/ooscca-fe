"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function LogoInput({ setFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
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

function LogoPreview({ files }) {
  return (
    <>
      {files.map((file) => (
        <Box
          component="img"
          src={file.preview}
          alt="Preview"
          sx={{ objectFit: "contain", width: "100%", height: "100%" }}

          onLoad={() => URL.revokeObjectURL(file.preview)}
          key={file.name}
        />
      ))}
    </>
  );
}

export default function DropZoneLogoUpload(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
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
      {files.length === 0 && <LogoInput setFiles={setFiles} />}
      {files.length !== 0 && <LogoPreview files={files} />}
    </Box>
  );
}
