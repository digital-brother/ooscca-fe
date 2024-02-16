"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  IconButton,
  Paper,
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

import _ from "lodash";
import NextImage from "next/image";
import { useParams } from "next/navigation";
import prettyBytes from "pretty-bytes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteActivityImagePrimary, getActivityImagesPrimary, postActivityImagePrimary } from "../api.mjs";
import { useImmer } from "use-immer";
import { Errors, getFlatErrors } from "./formikFields";
import Carousel from 'react-material-ui-carousel';

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

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <img src={props.item.imageUrl} alt={props.item.name} style={{width: "100%", maxHeight: "500px", objectFit: "cover"}}/>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>
  )
}

export default function ImagesMultipleUpload() {
  const [images, setImages] = useImmer([]);
  const [formErrors, setFormErrors] = useState([]);

  const activityId = useParams().activityId;
  const { data: serverImages } = useQuery(["primaryImages", activityId], () => getActivityImagesPrimary(activityId));

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

  useEffect(() => {
    return () => images.forEach(({ data }) => URL.revokeObjectURL(data.file));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ maxWidth: { xs: 540, md: "none" }, mx: "auto" }}>
        <Carousel>
          {
            images.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>
      </Box>
    </Container>
  );
}
