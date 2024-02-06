"use client";

import { useEffect, useState, React } from "react";
import { Box, Button, Container, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDrag, useDrop, DndProvider } from "react-dnd";

import { ImageInput } from "./ImageUpload";
import { useMutation, useQuery } from "react-query";
import { HTML5Backend } from "react-dnd-html5-backend";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Errors } from "./formikFields";

import {
  getActivityImagesPrimary,
  patchActivityImage,
  deleteActivityImage,
  postActivityImage,
} from "@/app/activities/[activityId]/api.mjs";


function formatBytes(bytes, decimals) {
  if(bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function ImageDataRow({ files, setFiles, file, order, ...props  }) {
  const [, drag] = useDrag({
    type: "ROW",
    item: file,
  });

  const [, drop] = useDrop({
    accept: "ROW",
    hover: (draggedItem) => {
      if (draggedItem.order !== order) {
        // Reorder the rows
        const draggedIndex = files.findIndex((item) => item.order === draggedItem.order);
        const hoverIndex = files.findIndex((item) => item.order === order);

        const newFiles = [...files];
        newFiles.splice(hoverIndex, 0, newFiles.splice(draggedIndex, 1)[0]);
        setFiles((files) => newFiles);
      }
    },
  });

  let opacity = 1
  file.order = order
  if (file?.markedForDeleting) opacity = 0.3

  function handleDelete() {
    file.markedForDeleting = true
    delete file?.errors
    file = {...file}
    setFiles(files => files.filter(f => f !== null));
  }


  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        opacity,
        ...props?.sx
      }}
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
            fontSize: 16,
            fontFamily: "Manrope",
            fontWeight: "400",
            mt: 0.8,
          }}
        >
          {file?.errors && <Errors errors={file?.errors} />}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        { file.order }
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        {formatBytes(file.size, 1)}
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Button onClick={handleDelete}>
          <DeleteIcon color="grey" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

function ImagesListDesktop({ files, setFiles }) {
  const [, setIsDndReady] = useState(false);
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
            {Array.isArray(files) && (files.map((file, index) => (
              <ImageDataRow files={files} setFiles={setFiles} file={file} key={index+1} order={index+1}/>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
}

function ImagePreviewMobile({ files, setFiles, file, order, ...props }) {
  let opacity = 1

  // use drag & drop move to parent
  const [, drag] = useDrag({
    type: "ROW",
    item: file,
  });

  const [, drop] = useDrop({
    accept: "ROW",
    hover: (draggedItem) => {
      if (draggedItem.order !== order) {
        // Reorder the rows
        const draggedIndex = files.findIndex((item) => item.order === draggedItem.order);
        const hoverIndex = files.findIndex((item) => item.order === order);

        const newFiles = [...files];
        newFiles.splice(hoverIndex, 0, newFiles.splice(draggedIndex, 1)[0]);
        setFiles(files => newFiles);
      }
    },
  });

  file.order = order

  function handleDelete(event) {
    file.markedForDeleting = true
    delete file?.error
    file = {...file}  // ?
    setFiles(files => files.filter(f => f !== null));  // ?
  }

  if (file?.markedForDeleting) {
    opacity = 0.3
  }

  return (<Box
    component="img"
    src={file.preview || file.image}
    alt="Preview"
    sx={{ width: "100%", height: "100%", objectFit: "cover", opacity }}
    onLoad={() => URL.revokeObjectURL(file.url)}
  />)
}

function ImagesListMobile({ files, setFiles }) {

}

function ImagesList({ files, setFiles }) {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  if (mdUp) return <ImagesListDesktop {...{ files, setFiles }} />;
  else return <ImagesListMobile {...{ files, setFiles }} />;
}

export default function PrimaryImages() {
  const [files, setFiles] = useState([])
  const [isFilesLoaded, setIsFilesLoaded] = useState(false);
  const activityId = 1

  function removeFile(imageData) {
    setFiles(files => files.filter(fileData => fileData !== imageData));
  }

  function handleErrors(imageData, mutationErrors) {
    const imageErrors = mutationErrors?.response?.data?.image;
    const nonFieldErrors = mutationErrors?.response?.data?.nonFieldErrors;
    if (imageErrors) imageData.errors = imageErrors;
    else if (nonFieldErrors) imageData.errors = [nonFieldErrors];
    else imageData.errors = [mutationErrors.message];
  }

  const deleteMutation = useMutation((imageData) => deleteActivityImage(activityId, imageData?.id), {
    onSuccess: (data, sentImage) => removeFile(sentImage),
    onError: (errors, sentImage) => handleErrors(sentImage, errors)
  });

  const patchMutation = useMutation((imageData) => patchActivityImage(activityId, {
      "id": imageData.id,
      "name": imageData.name,
      "order": imageData.order,
    }), {
    onSuccess: (data, sentImage, context) => { sentImage.errors = [] },
    onError: (errors, sentImage) => handleErrors(sentImage, errors)
  });

  const postMutation = useMutation((imageData) => postActivityImage(activityId, {
      "name": imageData.name,
      "order": imageData.order,
      "size": imageData.size,
      "activity": activityId,
      "type": "primary",
      "image": imageData,
    }), {
    onSuccess: (data, sentImage) => {
      sentImage.errors  = null
      sentImage.id = data.id
    },
    onError: (errors, sentImage) => handleErrors(sentImage, errors),
  });

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "primaryImages",
    queryFn: () => getActivityImagesPrimary(activityId),
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

  async function deleteMarkedForDeletingImages() {
    // remove not uploaded files
    setFiles(files => files.filter(
      f => f.id || (!f.id  && !(f?.markedForDeleting))));

    // remove from backend
    const deletePromises = files
      .filter(files => files.id && files?.markedForDeleting === true)
      .map(file => deleteMutation.mutateAsync(file));

    // Wait for all delete mutations to complete
    await Promise.all(deletePromises);
  }

  async function updateUploadedImages() {
    // createdInBackendFilesAndNotMarkedForDeleting
    const patchPromises = files
      .filter(file => file.id)
      .filter(file => file?.markedForDeleting !== true)
      .map(file => patchMutation.mutateAsync(file));

    // Wait for all patch mutations to complete
    await Promise.all(patchPromises);
  }

  async function uploadNewImages() {
    // notCreatedInBackendFilesWithoutErrorsAndNotMarkedForDeleting
    const postPromises = files
      .filter(file => !file.id)
      // .filter(file => (file?.frontendErrors.length === 0))
      .filter(file => file?.markedForDeleting !== true)
      .map(file => postMutation.mutateAsync(file));

    // Wait for all post mutations to complete
    await Promise.all(postPromises);
  }

  async function SaveButtonHandler(event) {
    if (Array.isArray(files)) {
      try {
        files.map((fileData, index) => {
          fileData.errors = []
        });

        await deleteMarkedForDeletingImages()
        await updateUploadedImages()
        await uploadNewImages()


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
          return files.filter(file => file?.markedForDeleting === true)
        }

        function getFilesNotMarkedForDeleting(files) {
          return files.filter(file => file?.markedForDeleting !== true)
        }

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

  async function handleAdd( acceptedFiles ) {
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
        }}>
          Upload
        </Typography>
      </Box>
      <ImageInput files={files} handleAdd={handleAdd} multiple={true} sx={{
        backgroundColor: "#DEE2E6",
        height: 110,
        borderRadius: "16px",
      }}>
      </ImageInput>
      {files.length !== 0 && (
        <ImagesList files={files} setFiles={setFiles} />
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
