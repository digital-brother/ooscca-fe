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
import { Box, Container, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { ImageInput, ImagePreview } from "./ImageUpload";

import { deleteActivityImagePrimary, getActivityImagesPrimary, postActivityImagePrimary } from "@/app/api.mjs";
import NextImage from "next/image";
import { useParams } from "next/navigation";
import prettyBytes from "pretty-bytes";
import { useMutation, useQuery } from "react-query";
import { useImmer } from "use-immer";
import { Errors, getFlatErrors } from "./formikFields";

function ImagePreviewDesktopRow({ index, image, handleDelete }) {
  const { data, errors } = image;
  if (!data) return null;

  let colorSx;
  if (!data.id) colorSx = { color: "green.600" };
  if (data.toBeDeleted) colorSx = { color: "grey.400" };
  const ColoredTableCell = styled(TableCell)({ color: "inherit" });

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, ...colorSx }}>
      <ColoredTableCell component="th" scope="row">
        {"|||"}
      </ColoredTableCell>
      <ColoredTableCell align="right" sx={{ opacity: data.toBeDeleted ? 0.3 : 1 }}>
        <NextImage src={data.url} alt="thumbnail" width="50" height="50" />
      </ColoredTableCell>
      <ColoredTableCell align="right" sx={{}}>
        <Typography>{data.name}</Typography>
        {!!errors && <Errors errors={errors} />}
      </ColoredTableCell>
      <ColoredTableCell align="right" sx={colorSx}>
        {data.order}
      </ColoredTableCell>
      <ColoredTableCell align="right" sx={colorSx}>
        {prettyBytes(data.size)}
      </ColoredTableCell>
      <ColoredTableCell align="right">
        {!data.toBeDeleted && (
          <IconButton onClick={() => handleDelete(index)}>
            <DeleteForeverIcon sx={colorSx} />
          </IconButton>
        )}
      </ColoredTableCell>
    </TableRow>
  );
}

function ImagesPreviewMobile({ images, handleDelete }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}>
      {images.map((image, index) => (
        <>
          <ImagePreview
            key={index}
            image={image.data}
            handleDelete={() => handleDelete(index)}
            sx={{ opacity: image.data.toBeDeleted ? 0.3 : 1 }}
          />
          <Errors errors={image.errors} sx={{ textAlign: "center" }} />
        </>
      ))}
    </Box>
  );
}

function ImagesPreviewDesktop({ images, handleDelete }) {
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
            <ImagePreviewDesktopRow key={index} {...{ index, image, handleDelete: () => handleDelete(index) }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ImagesMultipleUpload() {
  const [images, setImages] = useImmer([]);
  const [formErrors, setFormErrors] = useState([]);

  const activityId = useParams().activityId;
  const { data: serverImages } = useQuery(["primaryImages", activityId], () => getActivityImagesPrimary(activityId));
  const postMutation = useMutation((data) => postActivityImagePrimary(activityId, data));
  const deleteMutation = useMutation((data) => deleteActivityImagePrimary(activityId, data));

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    if (!serverImages || images.length > 0) return;
    setImages(serverImages.map((image) => ({ data: image })) ?? []);
    console.log("updage");
  }, [serverImages]);

  function updateOrder() {
    setImages((images) => {
      let order = 1;
      images?.forEach(({ data }) => {
        if (!data) return
        if (!data.toBeDeleted) data.order = order++;
        else data.order = null;
      });
    });
    setFormErrors([]);
  }
  useEffect(updateOrder, [images]);

  async function validateFile(file) {
    const maxWidth = 5000;
    const maxHeight = 5000;
    const maxFileSizeMb = 5;

    const errors = [];
    if (file.size > maxFileSizeMb * 1024 * 1024)
      errors.push(`Image "${file.name}" size (${prettyBytes(file.size)}) exceeds ${maxFileSizeMb} MB.`);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = () => {
        errors.push(`Unable to load image ${file.name}.`);
        resolve();
      };
    });

    if (img.complete && (img.width > maxWidth || img.height > maxHeight))
      errors.push(`${file.name} should be less then ${maxWidth}x${maxHeight} px.`);

    URL.revokeObjectURL(img.src);
    return errors;
  }

  async function handleAdd(files) {
    const maxImagesAllowed = 5;
    const imagesCount = images.filter(({ data }) => !data.toBeDeleted).length;
    if (imagesCount + files?.length > maxImagesAllowed) {
      setFormErrors([`Maximum ${maxImagesAllowed} images allowed.`]);
      return;
    }

    const newImages = [];
    const formErrors = [];
    await Promise.all(
      files.map(async (file) => {
        const fileErrors = await validateFile(file);
        if (fileErrors.length) formErrors.push(...fileErrors);
        else
          newImages.push({
            data: { activity: activityId, url: URL.createObjectURL(file), name: file.name, size: file.size, file },
          });
      })
    );

    setImages((images) => {
      images.push(...newImages);
    });
    setFormErrors(formErrors);
  }

  function handleDelete(deleteIndex) {
    setImages((images) => {
      const data = images[deleteIndex].data;
      if (data.id) data.toBeDeleted = true;
      else images.splice(deleteIndex, 1);
    });
  }

  async function handleSave() {
    const promises = images.map(async ({ data }, index) => {
      const isAdded = !data.id;
      // const isUpdated = serverImages.some(
      //   (serverImage) => serverImage.id === image.id && !_.isEqual(image, serverImage)
      // );
      try {
        if (isAdded) {
          const response = await postMutation.mutateAsync(data);
          setImages((images) => {
            images[index].data = response;
          });
        }
        if (data.toBeDeleted) {
          await deleteMutation.mutateAsync(data.id);
          setImages((images) => {
            images[index].data = null;
          });
        }
      } catch (error) {
        setImages((images) => {
          const errors = getFlatErrors(error);
          images[index].errors = errors;
        });
      }
    });
    await Promise.all(promises);
    setImages((images) => images.filter(({ data }) => data !== null));
  }

  useEffect(() => {
    return () => images.forEach(({ data }) => URL.revokeObjectURL(data.file));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ maxWidth: { xs: 540, md: "none" }, mx: "auto" }}>
        <Box sx={{ height: 110, border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}>
          <ImageInput multiple={true} handleAdd={handleAdd} />
        </Box>
        {!!images?.length && (
          <>
            {mdUp && <ImagesPreviewDesktop {...{ images, handleDelete }} />}
            {!mdUp && <ImagesPreviewMobile {...{ images, handleDelete }} />}
            <Errors errors={formErrors} sx={{ textAlign: "center" }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
              <Button
                onClick={() => setImages(serverImages.map((serverImage) => ({ data: serverImage })))}
                variant="outlined"
                color="grey"
              >
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
