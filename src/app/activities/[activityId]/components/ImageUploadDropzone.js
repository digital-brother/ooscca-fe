"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";

function ImageInputDesktop({ handleAppend, multiple, sx }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      handleAppend(acceptedFiles);
    },
    multiple,
  });

  return (
    <Stack
      {...getRootProps({ sx: { alignItems: "center", bgcolor: "grey.200", gap: 1, p: 2, borderRadius: 1.5, ...sx } })}
    >
      <input {...getInputProps()} />

      <Typography sx={{ fontWeight: 700 }}>
        Drop your image file here or &nbsp;
        <span style={{ cursor: "pointer", color: "purple" }}>browse</span>
      </Typography>

      <Typography variant="caption">Max. file size: 5MB &nbsp;&nbsp;&nbsp;&nbsp; Dimension: 000 x 000px</Typography>
    </Stack>
  );
}

function ImageInputMobile({ sx, handleAppend, multiple }) {
  const fileInput = React.useRef();

  return (
    <Stack sx={{ alignItems: "center", bgcolor: "grey.200", p: 2, borderRadius: 1.5, ...sx }}>
      <Button
        variant="contained"
        onClick={() => fileInput.current.click()}
        size="large"
        sx={{ width: "65%", mx: "auto" }}
        color="grey"
      >
        Upload images
      </Button>

      <input
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/*" // Only allow image files
        onChange={(e) => handleAppend(Array.from(e.target.files))}
        multiple={multiple}
      />
    </Stack>
  );
}

export function ImageInput({ multiple, handleAppend, sx }) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      {mdUp ? (
        <ImageInputDesktop {...{ multiple, handleAppend, sx }} />
      ) : (
        <ImageInputMobile {...{ handleAppend, multiple, sx }} />
      )}
    </Box>
  );
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
        key={file.preview || file.id}
      />
      <IconButton
        color="grey"
        onClick={showImageDeleteConfirmation}
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

function ImageDeleteConfirm({ handleDelete, setShowConfirmDelete }) {
  async function imageDeleteConfirm() {
    try {
      if (handleDelete !== undefined) {
        handleDelete();
      }
    } catch (e) {}
    setShowConfirmDelete(false);
  }

  function imageDeleteCancel() {
    setShowConfirmDelete(false);
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
      <Typography sx={{ fontWeight: 700, mb: 2, display: { xs: "none", md: "block" }, px: "10%", textAlign: "center" }}>
        Are you sure you want to delete the file?
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
          display: { xs: "block", md: "none" },
          textAlign: "center",
          fontSize: 24,
          fontStyle: "normal",
        }}
      >
        Edit Image
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "80%",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={imageDeleteCancel}
          color="grey"
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            width: "100%",
            py: 1.5,
          }}
        >
          <Typography
            sx={{
              color: "grey.800",
              textAlign: "center",
              fontFamily: "Manrope",
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Cancel
          </Typography>
        </Button>
        <Button
          variant="contained"
          onClick={imageDeleteConfirm}
          color="grey"
          sx={{
            flexGrow: 1,
            backgroundColor: "grey.600",
            width: "100%",
            py: 1.7,
          }}
        >
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontFamily: "Manrope",
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default function ImageUpload({ file, setFile, ...props }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleDelete = () => setFile(null);
  const handleAppend = (file) => setFile(file);
  
  return (
    <Box
      sx={{
        width: 380,
        height: 110,
        borderRadius: 1.5,
        border: "1px #ADB5BD solid",
        overflow: "hidden",
        bgcolor: "grey.200",
        ...props?.sx,
      }}
    >
      {showConfirmDelete && ( <ImageDeleteConfirm {...{ file, handleDelete, setShowConfirmDelete }} /> )}
      {!file && (
        <ImageInput
          handleAppend={handleAppend}
          multiple={false}
          sx={{ backgroundColor: props?.sx?.backgroundColor || props?.sx?.bgColor }}
        />
      )}
      {file && <ImagePreview {...{ file, setShowConfirmDelete }} />}
    </Box>
  );
}
