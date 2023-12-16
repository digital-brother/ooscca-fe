"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function ImageUpload() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const inputFileRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const dataURL = await getBase64(file);
      setImagePreviewUrl(dataURL);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 380,
          height: 110,
          borderRadius: 1.5,
          border: "1px #ADB5BD solid",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "#DEE2E6",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>
            Drop your logo file here or &nbsp;
            <span
              onClick={() => inputFileRef.current.click()}
              style={{ cursor: "pointer", color: "#B01FB8" }}
            >
              browse
            </span>
          </Typography>

          <Typography variant="caption">
            Max. file size: 5MB &nbsp;&nbsp;&nbsp;&nbsp; Dimension: 000 x 000px
          </Typography>

          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            ref={inputFileRef}
            hidden
          />
        </Box>
      </Box>

      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{ marginTop: "20px", maxHeight: "200px" }}
        />
      )}
    </>
  );
}
