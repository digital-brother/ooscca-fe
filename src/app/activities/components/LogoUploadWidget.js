"use client";

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function ImageInput({ setImagePreviewUrl }) {
  const inputFileRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const dataURL = URL.createObjectURL(file)
      setImagePreviewUrl(dataURL);
    }
  };

  return (
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
  );
}

function ImagePreview({ imagePreviewUrl }) {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box
        component="img"
        src={imagePreviewUrl}
        alt="Preview"
        sx={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </Box>
  );
}

export default function LogoUploadWidget() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

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
        {imagePreviewUrl ? (
          <ImagePreview imagePreviewUrl={imagePreviewUrl} />
        ) : (
          <ImageInput setImagePreviewUrl={setImagePreviewUrl} />
        )}
      </Box>
    </>
  );
}
