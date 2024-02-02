"use client";

import { Box, Container } from "@mui/system";
import { ImageInput } from "./ImageUpload";
import { useState } from "react";

export default function ImageMultipleUpload() {
  const [files, setFiles] = useState([]);

  function handleAdd(files) {
    setFiles((previousFiles) => [...previousFiles, ...files]);
  }

  console.log(files);

  return (
    <Container sx={{ my: 10 }}>
      <Box
        sx={{ height: 110, overflow: "hidden", border: "1px #ADB5BD solid", borderRadius: 1.5, bgcolor: "grey.200" }}
      >
        <ImageInput multiple={true} handleAdd={handleAdd} />
      </Box>
    </Container>
  );
}
