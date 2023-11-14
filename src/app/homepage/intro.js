import {Box, Button} from "@mui/material";
import Image from "next/image";

export default function Intro() {
  return (
    <>
      <Box py={8}>
        <Image src="/demo.svg" alt="Demo" width={350} height={256}/>
      </Box>
      <Box>
        <Box>Bringing activity planning into 21st century.</Box>
        <Box>Effortless to find and manage Out Of School Activities</Box>
        <Box>All-in-one platform that reimagines the way to arrange and pay activities.</Box>
        <Button>Sign in to plan better </Button>
      </Box>
    </>
  )
}
