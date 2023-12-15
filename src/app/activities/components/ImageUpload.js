"use client";

import { useState } from "react";

export default function ImageUpload() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <label htmlFor="avatar">Choose a profile picture:</label>

      <br />
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />
      {imagePreviewUrl && (
        <>
          <br />
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{ marginTop: "20px", maxHeight: "200px" }}
          />
        </>
      )}
    </>
  );
}
