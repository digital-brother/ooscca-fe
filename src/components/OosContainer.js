"use client";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function OssContainer({ children, sx, handleClick = null }) {
    const router = useRouter();
    const clickHandler = typeof handleClick === 'function' ? handleClick : () => router.push("/");

    return (
      <Box sx={{ width: { xs: "100%", sm: 545 }, maxWidth: 545, p: 4, ...sx }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image src="/logo.png" alt="Logo" width={160} height={36} />
          <IconButton size="small" onClick={clickHandler}>
            <HighlightOffRoundedIcon sx={{ color: "common.black", fontSize: 28 }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    );
  }
