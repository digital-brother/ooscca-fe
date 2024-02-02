"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { ImageInput } from "./ImageUpload";

import prettyBytes from "pretty-bytes";

export default function ImageMultipleUpload() {
  const [files, setFiles] = useState([]);

  function handleAdd(files) {
    setFiles((previousFiles) => [...previousFiles, ...files]);
  }

  function handleDelete(deleteIndex) {
    setFiles((previousFiles) => previousFiles.filter((_, index) => index !== deleteIndex));
  }

  console.log(files);

  return (
    <Container sx={{ my: 10 }}>
      <Box
        sx={{ height: 110, overflow: "hidden", border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}
      >
        <ImageInput multiple={true} handleAdd={handleAdd} />
      </Box>
      {files?.length > 0 && (
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
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {"|||"}
                  </TableCell>
                  <TableCell align="right">{"thunb"}</TableCell>
                  <TableCell align="right">{file.name}</TableCell>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{prettyBytes(file.size)}</TableCell>
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
      )}
    </Container>
  );
}
