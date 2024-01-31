"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";

const imageInputContainerSx = {
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

function ImageInputDesktop({ handleAdd, multiple, sx }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      handleAdd(acceptedFiles);
    },
    multiple,
  });

  return (
    <Stack {...getRootProps({ sx: { ...imageInputContainerSx, gap: 1, ...sx } })}>
      <input {...getInputProps()} />
      <Typography sx={{ fontWeight: 700 }}>
        Drop your image file here or <span style={{ cursor: "pointer", color: "purple" }}>browse</span>
      </Typography>
      <Typography variant="caption">Max. file size: 5MB &nbsp;&nbsp;&nbsp;&nbsp; Dimension: 000 x 000px</Typography>
    </Stack>
  );
}

function ImageInputMobile({ sx, handleAdd, multiple }) {
  const fileInput = React.useRef();

  return (
    <Stack sx={{ ...imageInputContainerSx, ...sx }}>
      <Button
        variant="contained"
        onClick={() => fileInput.current.click()}
        size="large"
        sx={{ width: "65%" }}
        color="grey"
      >
        Upload images
      </Button>

      <input
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/*" // Only allow image files
        onChange={(e) => handleAdd(Array.from(e.target.files))}
        multiple={multiple}
      />
    </Stack>
  );
}

export function ImageInput({ multiple, handleAdd, sx }) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  if (mdUp) return <ImageInputDesktop {...{ multiple, handleAdd, sx }} />;
  else return <ImageInputMobile {...{ handleAdd, multiple, sx }} />;
}

function ImagePreview({ file, setShowConfirmDelete }) {
  function showImageDeleteConfirmation() {
    setShowConfirmDelete(true);
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box
        component="img"
        src={file.preview || file.image}
        alt="Preview"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        onLoad={() => URL.revokeObjectURL(file.url)}
      />
      <IconButton color="grey" onClick={showImageDeleteConfirmation} sx={{ position: "absolute", top: 10, right: 10 }}>
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
}

function ImageDeleteConfirm({ handleDelete, setShowConfirmDelete }) {
  async function handleConfirm() {
    handleDelete();
    setShowConfirmDelete(false);
  }

  function handleCancel() {
    setShowConfirmDelete(false);
  }

  return (
    <Stack sx={{ ...imageInputContainerSx, width: "80%", gap: 2, mx: "auto", textAlign: "center" }}>
      <Typography variant="h5">Delete Image?</Typography>
      <Button variant="outlined" onClick={handleCancel} color="grey" fullWidth>
        Cancel
      </Button>
      <Button variant="contained" onClick={handleConfirm} color="grey" fullWidth>
        Confirm
      </Button>
    </Stack>
  );
}

export default function ImageUpload({ file, setFile, ...props }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  

  const handleDelete = (file) => {
    setFile(null);
  };

  const handleAdd = (files) => {
    const file = { ...files[0], preview: URL.createObjectURL(files[0]) };
    setFile(file);
  };

  useEffect(() => () => file?.preview && URL.revokeObjectURL(file.preview), [file?.preview]);

  return (
    <Box
      sx={{
        width: 330,
        height: 330,
        overflow: "hidden",
        border: "1px #ADB5BD solid",
        borderRadius: 1.5,
        bgcolor: "grey.200",
        ...props?.sx,
      }}
    >
      {showConfirmDelete && <ImageDeleteConfirm {...{ file, handleDelete, setShowConfirmDelete }} />}
      {!file && (
        <ImageInput
          handleAdd={handleAdd}
          multiple={false}
          sx={{ backgroundColor: props?.sx?.backgroundColor || props?.sx?.bgColor }}
        />
      )}
      {file && <ImagePreview {...{ file, setShowConfirmDelete }} />}
    </Box>
  );
}
