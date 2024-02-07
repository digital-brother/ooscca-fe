"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { deleteActivityImageSecondary, getActivityImagesSecondary, postActivityImageSecondary } from "../api.mjs";
import { useParams } from "next/navigation";
import { Errors } from "./formikFields";

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
        Upload image
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

function ImagePreview({ image, setShowConfirmDelete }) {
  function showImageDeleteConfirmation() {
    setShowConfirmDelete(true);
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box
        component="img"
        src={image.url}
        alt="Preview"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        onLoad={() => URL.revokeObjectURL(image.url)}
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

export default function ImageUpload({ sx, order }) {
  const activityId = useParams().activityId;
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const { data: secondaryImages } = useQuery("activityImagesSecondary", () => getActivityImagesSecondary(activityId));
  const initialImage = secondaryImages?.filter((secondaryImage) => secondaryImage.order === order)[0];
  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const postMutation = useMutation((imageData) => postActivityImageSecondary(activityId, imageData));
  const deleteMutation = useMutation((imageId) => deleteActivityImageSecondary(activityId, imageId));

  function handleDelete() {
    deleteMutation.mutate(image.id, {
      onSuccess: () => {
        setImage(null);
        setErrors([]);
      },
      onError: (error) => setErrors([error.message]),
    });
  }

  function handleAdd(files) {
    const file = files[0];
    const image = {
      activity: activityId,
      type: "secondary",
      name: file.name,
      file,
      order,
    };
    postMutation.mutate(image, {
      onSuccess: (data) => {
        setImage(data);
        setErrors([]);
      },
      onError: (error) => {
        console.log();
        const imageErrors = error?.response?.data?.image;
        const nonFieldErrors = error?.response?.data?.nonFieldErrors;
        if (imageErrors) setErrors(imageErrors);
        else if (nonFieldErrors) setErrors((errors) => [nonFieldErrors]);
        else setErrors([error.message]);
      },
    });
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 553, ...sx }}>
      <Box
        sx={{
          height: 330,
          overflow: "hidden",
          border: "1px #ADB5BD solid",
          borderRadius: 1.5,
          bgcolor: "grey.200",
        }}
      >
        {showConfirmDelete && <ImageDeleteConfirm {...{ handleDelete, setShowConfirmDelete }} />}
        {!image && (
          <ImageInput
            handleAdd={handleAdd}
            multiple={false}
            sx={{ backgroundColor: sx?.backgroundColor || sx?.bgColor }}
          />
        )}
        {image && <ImagePreview {...{ image, setShowConfirmDelete }} />}
      </Box>
      {errors && <Errors errors={errors} />}
    </Box>
  );
}
