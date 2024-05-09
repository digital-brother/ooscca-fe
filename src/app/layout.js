"use client";

import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/app/Header";
import Footer from "@/app/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // To avoid refetching while using same queries in both parent & child components
      staleTime: 100,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
              <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
                <Header />
                <Box>{children}</Box>
                <Footer />
              </Box>
            </SnackbarProvider>
          </QueryClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
