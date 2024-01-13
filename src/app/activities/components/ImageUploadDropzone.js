"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";
import { useMutation, useQuery } from "react-query";

export function ImageInput({ multiple, handleAppend, ...props }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      handleAppend(acceptedFiles)
    },
    multiple: multiple,
  });

  return (
    <Box
      {...getRootProps({
        sx: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: props?.sx.backgroundColor || props?.sx.bgColor || "#DEE2E6",
          gap: 1,
          ...props.sx,
        },
      })}
    >
      <input {...getInputProps()} />

      <Typography sx={{ fontWeight: 700 }}>
        Drop your image file here or &nbsp;
        <span style={{ cursor: "pointer", color: "#B01FB8" }}>browse</span>
      </Typography>

      <Typography variant="caption">
        Max. file size: 5MB &nbsp;&nbsp;&nbsp;&nbsp; Dimension: 000 x 000px
      </Typography>
    </Box>
  );
}

function ImagePreview({ files, setConfirmDelete }) {
  function showImageDeleteConfirmation() {
    setConfirmDelete(true);
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {files.map((file) => (
        <Box
          component="img"
          src={file.preview || file.image}
          alt="Preview"
          sx={{ objectFit: "contain", width: "100%", height: "100%", objectFit: "cover", }}
          onLoad={() => URL.revokeObjectURL(file.url)}
          key={file.preview || file.id}
        />
      ))}
      <IconButton
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



function ImageDeleteConfirm({ handleDelete, setConfirmDelete }) {

  async function imageDeleteConfirm() {
    try {
      if (handleDelete !== undefined) {
        handleDelete()
      }
    } catch (e) { }
    setConfirmDelete(false)
  }

  function imageDeleteCancel() {
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
        }}
      >
        <Button
          variant="outlined"
          onClick={imageDeleteCancel}
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            marginRight: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={imageDeleteConfirm}
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

export default function DropZoneImageUpload({files, handleAppend, handleDelete, ...props}) {
  // const [files, setFiles] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState();


  return (
    <Box
      sx={{
        width: 380,
        height: 110,
        borderRadius: 1.5,
        border: "1px #ADB5BD solid",
        overflow: "hidden",
        bgcolor: "#DEE2E6",
        ...props?.sx,
      }}
    >
      {confirmDelete && (
        <ImageDeleteConfirm
          files={files}
          handleDelete={handleDelete}
          setConfirmDelete={setConfirmDelete}
        />
      )}
      {files.length === 0 && <ImageInput handleAppend={handleAppend} multiple={false} sx={{ backgroundColor: props?.sx?.backgroundColor || props?.sx?.bgColor }} />}
      {files.length !== 0 && (
        <ImagePreview files={files} setConfirmDelete={setConfirmDelete} key={1} />
      )}
    </Box>
  );
}
