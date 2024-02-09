"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { ImageInput, ImagePreview } from "./ImageUpload";

import _ from "lodash";
import NextImage from "next/image";
import { useParams } from "next/navigation";
import prettyBytes from "pretty-bytes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteActivityImagePrimary, getActivityImagesPrimary, postActivityImagePrimary } from "../api.mjs";
import { useImmer } from "use-immer";
import { Errors, getFlatErrors } from "./formikFields";

function ImagePreviewRow({ index, image, handleDelete }) {
  let colorSx;
  if (!image.id) colorSx = { color: "green.600" };
  if (image.toBeDeleted) colorSx = { color: "grey.400" };
  // Extracted, as every preview needs own useDrag and useDrop
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {"|||"}
      </TableCell>
      <TableCell align="right" sx={{ opacity: image.toBeDeleted ? 0.3 : 1 }}>
        <NextImage src={image.url} alt="thumbnail" width="50" height="50" />
      </TableCell>
      <TableCell align="right">
        <Typography sx={colorSx}>{image.name}</Typography>
        {!!image.errors && <Errors errors={image.errors} />}
      </TableCell>
      <TableCell align="right" sx={colorSx}>
        {image.order}
      </TableCell>
      <TableCell align="right" sx={colorSx}>
        {prettyBytes(image.size)}
      </TableCell>
      <TableCell align="right">
        {!image.toBeDeleted && (
          <IconButton onClick={() => handleDelete(index)}>
            <DeleteForeverIcon sx={colorSx} />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

function ImagePreviewMobile({ images, handleDelete }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}>
      {images.map((image, index) => (
        <>
          <ImagePreview
            key={index}
            image={image}
            handleDelete={() => handleDelete(index)}
            sx={{ opacity: image.toBeDeleted ? 0.3 : 1 }}
          />
          <Errors errors={image.errors} sx={{ textAlign: "center" }} />
        </>
      ))}
    </Box>
  );
}

function ImagePreviewTable({ images, handleDelete }) {
  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Thumbnail</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map((image, index) => (
            <ImagePreviewRow key={index} {...{ index, image, handleDelete: () => handleDelete(index) }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ImageMultipleUpload() {
  const [images, setImages] = useImmer([]);
  const [frontEndErrors, setFrontEndErrors] = useState([]);

  const activityId = useParams().activityId;
  const queryClient = useQueryClient();
  const { data: serverImages } = useQuery(["primaryImages", activityId], () => getActivityImagesPrimary(activityId));
  const postMutation = useMutation((data) => postActivityImagePrimary(activityId, data));
  const deleteMutation = useMutation((data) => deleteActivityImagePrimary(activityId, data));

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    setImages(serverImages);
  }, [serverImages]);

  useEffect(() => {
    setImages((images) => {
      let order = 1;
      images?.forEach((image) => {
        if (!image.toBeDeleted) image.order = order++;
        else image.order = null;
      });
    });
    setFrontEndErrors([]);
  }, [images]);

  async function validateFile(file) {
    const maxWidth = 5;
    const maxHeight = 5;

    const errors = [];
    if (file.size > 5 * 1024 * 1024) errors.push(`Image "${file.name}" size (${prettyBytes(file.size)}) exceeds 5 MB.`);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        errors.push(`Unable to load image ${file.name}.`);
        resolve();
      };
    });

    if (img.width > maxWidth || img.height > maxHeight)
      errors.push(`${file.name} should be less then ${maxWidth}x${maxHeight} px.`);
    
    URL.revokeObjectURL(img.src);
    return errors;
  }

  async function handleAdd(files) {
    const maxImagesAllowed = 5;
    const imagesCount = images.filter((image) => !image.toBeDeleted).length;
    if (imagesCount + files?.length > maxImagesAllowed) {
      setFrontEndErrors([`Maximum ${maxImagesAllowed} images allowed.`]);
      return;
    }

    const newImages = [];
    const formErrors = [];

    await Promise.all(
      files.map(async (file) => {
        const fileErrors = await validateFile(file);
        if (fileErrors) formErrors.push(...fileErrors);
        else
          newImages.push({
            activity: activityId,
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            file,
          });
      })
    );
    setImages((images) => {
      images.push(...newImages);
      // images.sort((a, b) => a.order - b.order);
    });
    setFrontEndErrors(formErrors);
  }

  function handleDelete(deleteIndex) {
    setImages((images) => {
      const image = images[deleteIndex];
      if (image.id) images[deleteIndex].toBeDeleted = true;
      else images.splice(deleteIndex, 1);
    });
  }

  function handleSave() {
    images.forEach(async (image, index) => {
      const isAdded = !image.id;
      // const isUpdated = serverImages.some(
      //   (serverImage) => serverImage.id === image.id && !_.isEqual(image, serverImage)
      // );
      try {
        if (isAdded) await postMutation.mutateAsync(image);
        if (image.toBeDeleted) await deleteMutation.mutateAsync(image.id);
      } catch (error) {
        setImages((images) => {
          const errors = getFlatErrors(error);
          images[index].errors = errors;
        });
      }
    });
    queryClient.invalidateQueries(["primaryImages", activityId]);
  }

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.file));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ maxWidth: { xs: 540, md: "none" }, mx: "auto" }}>
        <Box sx={{ height: 110, border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}>
          <ImageInput multiple={true} handleAdd={handleAdd} />
        </Box>
        {!!images?.length && (
          <>
            {mdUp && <ImagePreviewTable {...{ images, handleDelete }} />}
            {!mdUp && <ImagePreviewMobile {...{ images, handleDelete }} />}
            <Errors errors={frontEndErrors} sx={{ textAlign: "center" }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
              <Button onClick={() => setImages(serverImages)} variant="outlined" color="grey">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained" color="green">
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
