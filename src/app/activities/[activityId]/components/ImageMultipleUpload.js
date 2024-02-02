"use client";

import { Box, Container } from "@mui/system";
import { ImageInput } from "./ImageUpload";
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import prettyBytes from "pretty-bytes";

export default function ImageMultipleUpload() {
  const [files, setFiles] = useState([]);

  function handleAdd(files) {
    setFiles((previousFiles) => [...previousFiles, ...files]);
  }

  // TODO: function handleDelete() {}

  console.log(files);

  return (
    <Container sx={{ my: 10 }}>
      <Box
        sx={{ height: 110, overflow: "hidden", border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}
      >
        <ImageInput multiple={true} handleAdd={handleAdd} />
      </Box>
      <Box>
        {files.map((file, index) => (
          <>
            <Typography key={index}>{file.name}</Typography>
            <Typography key={index}>{index}</Typography>
            <Typography key={index}>{prettyBytes(file.size)}</Typography>
            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
          </>
        ))}
      </Box>
    </Container>
  );
}
