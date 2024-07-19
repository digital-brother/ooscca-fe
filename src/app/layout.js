"use client";

import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/app/Header";
import Footer from "@/app/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { Box, Typography } from "@mui/material";
import { createContext, useState, useEffect } from "react";
import { AUTH_TOKEN_KEY } from "@/app/api.mjs";
import { keyframes } from '@emotion/react';


const ticker = keyframes`
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TickerTape = () => {
  return (
    <Box
    sx={{
      width: '100%',
      overflow: 'hidden',
      backgroundColor: "magenta.500",
      color: 'white',
      whiteSpace: 'nowrap',
      fontSize: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 1
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: `${ticker} 15s linear infinite`,
        gap: 15,
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>
        OOSCCA is being built for the community
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>
        We&apos;re in Beta
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>
        More clubs are being added
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>
        We appreciate your support
      </Typography>
    </Box>
  </Box>
);
};

export const AuthTokenContext = createContext({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // To avoid refetching while using same queries in both parent & child components
      staleTime: 100,
    },
  },
});

export default function RootLayout({ children }) {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN_KEY));
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <QueryClientProvider client={queryClient}>
          <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
          <SnackbarProvider>
              <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
                <TickerTape />
                <Header />
                <Box>{children}</Box>
                <Footer />
              </Box>
            </SnackbarProvider>
          </AuthTokenContext.Provider>
          </QueryClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
