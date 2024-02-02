"use client";

import { useEffect, useState } from "react";
import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { useParams } from "next/navigation";

import {ImageInput} from "@/app/activities/[activityId]/components/ImageUploadDropzone";
import { useMutation, useQuery } from "react-query";
import { HTML5Backend } from "react-dnd-html5-backend";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TrashCanIcon } from "@/assets/TrashCanIcon";

import {
  getPrimaryImages,
  patchImage,
  deleteImage,
  postImage,
} from "@/app/activities/apiImage.mjs";


function formatBytes(bytes, decimals) {
  if(bytes === 0) return "0 Bytes";
    const k = 1024
    const dm = decimals || 2
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function ImageDataRow({ files, setFiles, file, _key, ...props  }) {
  let opacity = 1
  const [, drag] = useDrag({
    type: "ROW",
    item: file,
  });

  const [, drop] = useDrop({
    accept: "ROW",
    hover: (draggedItem) => {
      if (draggedItem.id !== _key) {
        // Reorder the rows
        const draggedIndex = files.findIndex((item) => item.order === draggedItem.order);
        const hoverIndex = files.findIndex((item) => item.order === _key);

        const newFiles = [...files];
        newFiles.splice(hoverIndex, 0, newFiles.splice(draggedIndex, 1)[0]);
        setFiles(files => newFiles);
      }
    },
  });

  file.order = _key

  function handleDelete(event) {
    file.deleted = true
    delete file?.error
    file = {...file}

    setFiles(files => files.filter(f => f !== null));
  }

  let messageColor = ""

  if (file?.deleted) {
    opacity = 0.3
  }

  return <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        opacity,
        ...props?.sx
      }}
      key={ _key }
      ref={(node) => drag(drop(node))}
    >
      <TableCell component="th" scope="row" align="center">
        <Box component="img"
          src={file.preview || file.image}
          sx={{
            height: 33,
            borderRadius: "6px",
          }}
          alt={file.name}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        {file.name}
        <Box sx={{
            color: messageColor,
            fontSize: 16,
            fontFamily: "Manrope",
            fontWeight: "400",
            mt: 0.8,
          }}
        >
          {messageTexts.map((text, index) => (<Box key={index}>{text}</Box>))}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        { file.order }
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {formatBytes(file.size, 1)}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Button onClick={handleDelete} key={_key}>
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
              <ImageDataRow files={files} setFiles={setFiles} file={file} key={key+1} _key={key+1}/>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
}

export default function UploadImages() {
  const [files, setFiles] = useState([]);
  const [isFilesLoaded, setIsFilesLoaded] = useState(false);
  const activityId = useParams().activityId

  const deleteMutation = useMutation((data) => deleteImage(data?.id), {
    onSuccess: (data, sentImage, context) => {
      setFiles(files => files.filter(item => item.id !== sentImage?.id));
    },
    onError: (error, sentImage, context) => {
      sentImage.error = error
    },
  });

  const patchMutation = useMutation((file) => patchImage({
      "id": file.id,
      "name": file.name,
      "order": file.order,
    }), {
    onSuccess: (data, sentImage, context) => {
      sentImage.error = null
    },
    onError: (error, sentImage, context) => {
      sentImage.error = error
    },
  });

  const postMutation = useMutation((file) => postImage({
      "name": file.name,
      "order": file.order,
      "size": file.size,
      "activity": activityId,
      "type": "primary",
      "image": file,
    }), {
    onSuccess: (data, sentImage, context) => {
      sentImage.error = null
      sentImage.id = data.id
    },
    onError: (error, sentImage, context) => {
      const imageErrors = error?.response?.data?.image;
      const nonFieldErrors = error?.response?.data?.nonFieldErrors;
      if (imageErrors) sentImage.error = imageErrors;
      else if (nonFieldErrors) sentImage.error = [nonFieldErrors];
      else sentImage.error = [error.message];
    },
  });

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "primaryImages",
    queryFn: () => getPrimaryImages(),
    enabled: !isFilesLoaded,  // disable repeated requests
    onSuccess: (data) => {
      setIsFilesLoaded(true);
    }
  });

  useEffect(() => {
    if (!isLoading && !isError && images) {
      setFiles(files => images);
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

        setFiles(files => files
          .filter(file => file.id || (!file.id  && !(file?.deleted)))
        );

        //createdInBackendAndMarkedForDeleting
        const deletePromises = files
          .filter(file => file.id && file?.deleted === true)
          .map(file => deleteMutation.mutateAsync(file));
        await Promise.all(deletePromises);

        setFiles(files => files.filter(file => file !== null))

        function getFilesExistedInBackend(files) {
          return files.filter(file => file.id)
        }

        function getFilesNotExistedInBackend(files) {
          return files.filter(file => !file.id)
        }

        function getFilesWithoutFrontendErrors(files) {
          return files.filter(file => !(file?.frontendErrors.length > 0))
        }

        function getFilesMarkedForDeleting(files) {
          return files.filter(file => file?.deleted === true)
        }

        function getFilesNotMarkedForDeleting(files) {
          return files.filter(file => file?.deleted !== true)
        }

        // createdInBackendFilesAndNotMarkedForDeleting
        const patchPromises = files
          .filter(file => file.id)
          .filter(file => file?.deleted !== true)
          .map(file => patchMutation.mutateAsync(file));

        // notCreatedInBackendFilesWithoutErrorsAndNotMarkedForDeleting
        const postPromises = files
          .filter(file => !file.id)
          .filter(file => !(file?.frontendErrors.length > 0))
          .filter(file => file?.deleted !== true)
          .map(file => postMutation.mutateAsync(file));

        // Wait for all patch mutations to complete
        await Promise.all(patchPromises);

        // Wait for all post mutations to complete
        await Promise.all(postPromises);

        // Update state after all mutations are complete
        files.map((file, index) => ({
          key: file.key,
          _key: file._key,
          error: file.error,
          id: file.id,
          image: file.preview || file.image,
          name: file.path || file.name,
          order: file.positon,
          size: file.size,
          activity: activityId,
        }));
        setFiles(updatedFiles => updatedFiles.filter(f => f !== null));
      } catch (error) {
        // Handle errors if needed
        console.error("Error saving images:", error);
      }
    }
  }

  async function handleAppend(acceptedFiles) {
    setFiles(files => [...files, ...acceptedFiles.map((file, index) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      }),
    ]);
  }

  return (
    <Container sx={{
      py: {xs: 6, md: 3},
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
    }}>
      <Box>
        <Typography sx={{
          fontFamily: "Montserrat",
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: 1.4, /* 140% */
          letterSpacing: 0.2,
          height: 50,
          display: "flex",
          pb: 5,
        }}>Upload
        </Typography>
      </Box>
      <ImageInput files={files} handleAppend={handleAppend} multiple={true} sx={{
        backgroundColor: "#DEE2E6",
        height: 110,
        borderRadius: "16px",
      }}>
      </ImageInput>
      {files.length !== 0 && (
        <FilesTable files={files} setFiles={setFiles} />
      )}
      {files.length !== 0 && (
        <Button onClick={SaveButtonHandler} color="green" sx={{
          width: "20%",
          height: 37,
          py: 11,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "7px",
          background: "#00A551",
          alignSelf: "end",
          py: 3,
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
