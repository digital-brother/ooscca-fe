"use client";

import { useState } from "react";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function ImageUpload() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {

      const dataURL = await getBase64(file)
      setImagePreviewUrl(dataURL)
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
