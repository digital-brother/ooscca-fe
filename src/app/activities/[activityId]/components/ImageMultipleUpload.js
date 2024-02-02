"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { ImageInput } from "./ImageUpload";

import prettyBytes from "pretty-bytes";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";

function ImageMultiplePreview({ filesData, handleDelete }) {
  const [, drag] = useDrag(() => ({
    type: "imagePreview",
    // collect: (monitor) => ({
    //   isDragging: !!monitor.isDragging(),
    // }),
  }));

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: "imagePreview",
  //     drop: () => setImageOrder(order),
  //   }),
  //   [order]
  // );

  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow ref={drag}>
            <TableCell></TableCell>
            <TableCell align="right">Thumbnail</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesData.map((fileData, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {"|||"}
              </TableCell>
              <TableCell align="right">
                <Image src={fileData.url} alt="thumbnail" width="50" height="50" />
              </TableCell>
              <TableCell align="right">{fileData.file.name}</TableCell>
              <TableCell align="right">{fileData.order}</TableCell>
              <TableCell align="right">{prettyBytes(fileData.file.size)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ImageMultipleUpload() {
  const [filesData, setFilesData] = useState([]);

  function handleAdd(files) {
    const newFilesData = files.map((file, index) => {
      const filesCount = filesData.length;
      return { file, url: URL.createObjectURL(file), order: index + filesCount + 1 };
    });
    setFilesData((previousFilesData) => [...previousFilesData, ...newFilesData].sort((a, b) => a.order - b.order));
  }

  function handleDelete(deleteIndex) {
    setFilesData((previousFilesData) => previousFilesData.filter((_, index) => index !== deleteIndex));
  }

  useEffect(() => {
    return () => filesData.forEach((fileData) => URL.revokeObjectURL(fileData.url));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ height: 110, border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}>
        <ImageInput multiple={true} handleAdd={handleAdd} />
      </Box>
      {filesData?.length > 0 && <ImageMultiplePreview {...{ filesData, handleDelete }} />}
    </Container>
  );
}
