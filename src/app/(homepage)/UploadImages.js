"use client";

import { useEffect, useState } from "react";
import {Box, Button, Container, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDrag, useDrop } from 'react-dnd';

import {ImageInput} from "@/app/activities/components/LogoUploadDropzone";
import { useMutation, useQuery } from "react-query";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TrashCanIcon } from "@/assets/TrashCanIcon";

import { useDropzone } from "react-dropzone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  getImages,
  patchImage,
  deleteImage,
  postImage,
  TEST_ACTIVITY_ID,
} from "@/app/activities/apiImage.mjs";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function formatBytes(bytes, decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function ImageDataRow({ files, setFiles, file, _key, ...props  }) {
  const [collectedProps, drag] = useDrag({
    type: 'ROW',
    item: file,
  });

  const [, drop] = useDrop({
    accept: 'ROW',
    hover: (draggedItem) => {
      if (draggedItem.id !== _key) {
        // Reorder the rows
        const draggedIndex = files.findIndex((item) => item.position === draggedItem.position);
        const hoverIndex = files.findIndex((item) => item.position === _key);

        const newFiles = [...files];
        newFiles.splice(hoverIndex, 0, newFiles.splice(draggedIndex, 1)[0]);
        setFiles(newFiles);
      }
    },
  });

  file.position = _key
  const deleteMutation = useMutation((data) => deleteImage(data?.id), {
    onSuccess: (data, variables, context) => {
      setFiles(files.filter(item => item !== file));
    },
    onError: (error, variables, context) => {
      variables.error = error
    },
  });

  function deleteImageButtonHandler(event) {
    if (file?.id) {
      deleteMutation.mutate(file);
    } else {
      setFiles(files.filter(item => item !== file));
    }
  }

  let messageColor = ""
  let messageTexts = []

  file.frontendErrors = []
  if (file?.size > 5*1024*1024) {
    file.frontendErrors.push("image: Max file size is 5.0 MB")
  }

  if (file?.error || file.frontendErrors.length > 0) {
    messageColor = "#E72A2A"
    if (file?.error?.response?.data) {  // 2 types errors: from backend & if network failed
      for (const [key, value] of Object.entries(file?.error?.response?.data)) {
        messageTexts.push(key + ": " + value)
      }
    } else if (file?.error?.message) {
      messageTexts.push(file?.error?.message)
    } else if (file.frontendErrors.length > 0) {
      file.frontendErrors.map(frontendError => messageTexts.push(frontendError))
    } else {
      messageTexts.push("Unknown error")
    }

  } else {
    messageColor = "#196B40"
    if (file.hasOwnProperty("error")) {
      messageTexts.push("Image approved")
    }
  }

  return <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      key={ _key }
      ref={(node) => drag(drop(node))}
    >
      <TableCell component="th" scope="row" align="center">
        <Box component="img"
          src={file.preview || file.image}
          sx={{
            height: "33px",
            borderRadius: "6px",
          }}
          alt={file.name}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        {file.name}
        <Box sx={{
            color: messageColor,
            fontFamily: "Manrope",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "14px", /* 155.556% */
            letterSpacing: "0.09px",
            mt: "5px",
          }}
        >
          {messageTexts.map(text => (<Box>{text}</Box>))}

        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        { file.position }
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {formatBytes(file.size, 1)}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Button onClick={deleteImageButtonHandler} key={_key}>
          <TrashCanIcon />
        </Button>
      </TableCell>
    </TableRow>
}

function FilesTable({files, setFiles}) {
  const [isDndReady, setIsDndReady] = useState(false);
  useEffect(() => {
    setIsDndReady(true);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper} sx={{ border: "none", boxShadow: "none"}}>
        <Table sx={{ border: "none", boxShadow: "none"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width="15%">Thumbnail</TableCell>
              <TableCell align="left" width="50%">Name and status </TableCell>
              <TableCell align="center">Position</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(files) && (files.map((file, key) => (
              <ImageDataRow files={files} setFiles={setFiles} file={file} key={key+1} _key={key+1} />
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
}

export default function UploadImages() {
  const [files, setFiles] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);

  const patchMutation = useMutation((file) => patchImage({
      "id": file.id,
      "name": file.name,
      "position": file.position,
    }), {
    onSuccess: (data, variables, context) => {
      variables.error = null
    },
    onError: (error, variables, context) => {
      variables.error = error
    },
  });

  const postMutation = useMutation((file) => postImage({
      "name": file.name,
      "position": file.position,
      "size": file.size,
      "activity": TEST_ACTIVITY_ID,
      "image": file,
    }), {
    onSuccess: (data, variables, context) => {
      variables.error = null
      variables.id = data.id
    },
    onError: (error, variables, context) => {
      variables.error = error
    },
  });

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "images",
    queryFn: () => getImages(),
    enabled: !filesLoaded,  // disable repeated requests
    onSuccess: (data) => {
      setFilesLoaded(true);
    }
  });

  useEffect(() => {
    if (!isLoading && !isError && images) {
      setFiles(images);
    }
  }, [images, isLoading, isError]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.url));
  }, []);

  async function SaveButtonHandler(event) {
    if (Array.isArray(files)) {
      try {
        files.map((file, index) => {
          delete file.error
        });

        const patchPromises = files
          .filter(file => file.id)
          .map(file => patchMutation.mutateAsync(file));

        const postPromises = files
          .filter(file => !file.id)
          .map(file => postMutation.mutateAsync(file));

        // Wait for all patch mutations to complete
        const patchResults = await Promise.all(patchPromises);

        // Wait for all post mutations to complete
        const postResults = await Promise.all(postPromises);

        // Update state after all mutations are complete
        const updatedFiles = files.map((file, index) => ({
          error: file.error,
          id: file.id,
          image: file.preview || file.image,
          name: file.path || file.name,
          position: file.positon,
          size: file.size,
          activity: TEST_ACTIVITY_ID,
        }));
        setFiles(updatedFiles);
      } catch (error) {
        // Handle errors if needed
        console.error("Error saving images:", error);
      }
    }
  }

  return (
    <Container sx={{
      py: {xs: 6, md: 3},
      px: "33px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
    }}>
      <Box>
        <Typography sx={{
          fontFamily: "Montserrat",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "28px", /* 140% */
          letterSpacing: "0.2px",
          height: "50px",
          display: "flex",
          pb: "10px",
        }}>Upload
        </Typography>
      </Box>
      <ImageInput files={files} setFiles={setFiles} sx={{
        backgroundColor: "#DEE2E6",
        height: "110px",
        borderRadius: "16px",
      }}>
      </ImageInput>
      {files.length !== 0 && (
        <FilesTable files={files} setFiles={setFiles} />
      )}
      {files.length !== 0 && (
        <Button onClick={SaveButtonHandler} sx={{
          width: "20%",
          height: "37px",
          py: "11px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "7px",
          background: "#00A551",
          alignSelf: "end",
          py: "25px",
        }}>
          <Typography sx={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "Manrope",
            fontStyle: "normal",
            fontWeight: 800,
            lineHeight: "131.5%", /* 13.786px */
          }}>
            Save
          </Typography>
        </Button>
      )}
    </Container>
  )
}
