// "use client";
//
// import React, { useState } from "react";
//
// import { FilePond, registerPlugin } from "react-filepond";
//
// import "filepond/dist/filepond.min.css";
//
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import Box from "@mui/material/Box";
//
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
//
// export default function LogoUploadFilepond() {
//   const [files, setFiles] = useState([]);
//   return (
//     <Box sx={{ width: 380}}>
//       <FilePond
//         files={files}
//         onupdatefiles={setFiles}
//         maxFiles={3}
//         server="/api"
//         name="files"
//         labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
//         credits={false}
//         instantUpload={false}
//       />
//     </Box>
//   );
// }
