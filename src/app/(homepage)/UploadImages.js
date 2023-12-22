"use client";

import { useEffect, useState } from "react";
import {Box, Button, Container, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";

import {ImageInput} from "@/app/activities/components/LogoUploadDropzone";
import { useMutation, useQuery } from "react-query";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function FilesTable({files, setFiles}) {
  return (
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
          {console.log(files)}
          {Array.isArray(files) && (files.map((file, key) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={key+1}
            >
              <TableCell component="th" scope="row" align="center">
                <Box component="img"
                  src={file.preview || file.image}
                  sx={{
                    height: "100%",
                    width: "100%",
                  }}
                  alt={file.name}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {file.name}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {key + 1}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {formatBytes(file.size, 1)}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                Delete
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function UploadImages() {
  const [files, setFiles] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState();
  const mutation = useMutation((data, file) => patchImage(TEST_ACTIVITY_ID, data, file));

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "images",
    queryFn: () => getImages(),
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
        <Button sx={{
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
