"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";
import { useMutation, useQuery } from "react-query";

export function ImageInput({ multiple, handleAppend, ...props }) {
  const fileInput = React.useRef();
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
    <Box sx={{ height: "100%", p: 2 }}>
      <Box
        {...getRootProps({
          sx: {
            height: "100%",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: props?.sx.backgroundColor || props?.sx.bgColor || "grey.200",
            gap: 1,
            ...props.sx,
          },
        })}
      >
        <input {...getInputProps()} />

        <Typography sx={{ fontWeight: 700 }}>
          Drop your image file here or &nbsp;
          <span style={{ cursor: "pointer", color: "purple" }}>browse</span>
        </Typography>

        <Typography variant="caption">
          Max. file size: 5MB &nbsp;&nbsp;&nbsp;&nbsp; Dimension: 000 x 000px
        </Typography>
      </Box>

      <Box sx={{
        height: "100%",
        display: { xs: "flex", md: "none" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: props?.sx.backgroundColor || props?.sx.bgColor || "grey.200",
        gap: 1,
        alignItems: "center",
        width: "100%",
        ...props.sx,
      }}>
        <Button
          variant="contained"
          onClick={()=>fileInput.current.click()}
          sx={{
            backgroundColor: "white",
            height: 55,
            py: 1.7,
            selfAlign: "center",
            width: "65%",
            borderRadius: 2,
          }}
          color="grey"
        >
          <Typography sx={{
            color: "black",
            textAlign: "center",
            fontFamily: "Manrope",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: 700,
          }}>
            Upload images
          </Typography>
        </Button>

        <input
          ref={fileInput}
          type="file"
          style={{ display: 'none' }}
          accept="image/*" // Only allow image files
          onChange={(e) => handleAppend(Array.from(e.target.files))}
          multiple={multiple}
        />
      </Box>
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
      <Typography sx={{ fontWeight: 700, mb: 2, display: { xs: "none", md: "block" }, px: "10%", textAlign: "center" }}>
        Are you sure you want to delete the file?
      </Typography>
      <Typography sx={{
        fontWeight: 700,
        mb: 2,
        display: { xs: "block", md: "none" },
        textAlign: "center",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: 700,
      }}>
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
          sx={{
            flexGrow: 1,
            color: "black",
            borderColor: "black",
            width: "100%",
            py: 1.5,
          }}
        >
          <Typography sx={{
            color: "grey.800",
            textAlign: "center",
            fontFamily: "Manrope",
            fontSize: 15,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: 1.3,
          }}>
            Cancel
          </Typography>
        </Button>
        <Button
          variant="contained"
          onClick={imageDeleteConfirm}
          sx={{
            flexGrow: 1,
            backgroundColor: "grey.600",
            width: "100%",
            py: 1.7,
          }}
        >
          <Typography sx={{
            color: "white",
            textAlign: "center",
            fontFamily: "Manrope",
            fontSize: 15,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: 1.3,
          }}>
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default function DropZoneImageUpload({files, handleAppend, handleDelete, ...props}) {
  const [confirmDelete, setConfirmDelete] = useState();


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
