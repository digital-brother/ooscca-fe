"use client";

import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/app/Header";
import Footer from "@/app/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";
import { createContext, useState, useEffect } from "react";
import { AUTH_TOKEN_KEY } from "@/app/api.mjs";

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
