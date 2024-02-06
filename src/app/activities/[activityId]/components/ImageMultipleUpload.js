"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { ImageInput } from "./ImageUpload";

import prettyBytes from "pretty-bytes";
import Image from "next/image";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { getActivityImagesPrimary } from "../api.mjs";

function ImagePreviewRow({ index, file, handleDelete }) {
  console.log(file);
  // Extracted, as every preview needs own useDrag and useDrop
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {"|||"}
      </TableCell>
      <TableCell align="right">
        <Image src={file.image} alt="thumbnail" width="50" height="50" />
      </TableCell>
      <TableCell align="right">{file.name}</TableCell>
      <TableCell align="right">{file.order}</TableCell>
      <TableCell align="right">{prettyBytes(file.size)}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => handleDelete(index)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function ImagePreviewTable({ files, handleDelete }) {
  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Thumbnail</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <ImagePreviewRow key={index} {...{ index, file, handleDelete }} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ImageMultipleUpload() {
  const [files, setFiles] = useState([]);

  const activityId = useParams().activityId;
  const { data: images } = useQuery(["primaryImages", activityId], () => getActivityImagesPrimary(activityId));

  useEffect(() => {setFiles(images)}, [images]);

  const filesCount = files?.length;
  function handleAdd(files) {
    const newFilesData = files.map((file, index) => {
      file.image = URL.createObjectURL(file);
      file.order = index + filesCount + 1;
      return file
    });
    setFiles((previousFilesData) => [...previousFilesData, ...newFilesData].sort((a, b) => a.order - b.order));
  }

  function handleDelete(deleteIndex) {
    setFiles((previousFilesData) => previousFilesData.filter((_, index) => index !== deleteIndex));
  }

  function handleSave() {
    // get added files
    // get deleted files
    // get updated files
  }

  useEffect(() => {
    return () => files.forEach((fileData) => URL.revokeObjectURL(fileData.image));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ height: 110, border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}>
        <ImageInput multiple={true} handleAdd={handleAdd} />
      </Box>
      {files?.length > 0 && <ImagePreviewTable {...{ files, handleDelete }} />}
      <Button onClick={handleSave} variant="contained" color="green" sx={{ mt: 4, display: "block", ml: "auto" }}>
        Save
      </Button>
    </Container>
  );
}
