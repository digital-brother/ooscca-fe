import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, Container, IconButton, Typography } from "@mui/material";
import Image from "next/image";

export default function SignUpChildren() {
  return (
    <Container sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
      <Box sx={{ border: 1, borderRadius: 1.5, width: { xs: "100%", sm: 545 }, maxWidth: 545, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image src="/logo.png" alt="Logo" width={160} height={36} />
          <IconButton size="small">
            <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
          </IconButton>
        </Box>
        <Typography variant="h5" sx={{ mt: 6, textAlign: "center" }}>
          Children’s details
        </Typography>
        <Typography sx={{ mt: 1.5, textAlign: "center" }}>
          Add your child(ren)’s details here and we’ll do the rest
        </Typography>
        <Typography sx={{ fontWeight: 700, mt: 6 }}>Child 1</Typography>
      </Box>
    </Container>
  );
}
