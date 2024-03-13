"use client";

import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/app/Header";
import Footer from "@/app/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

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
              <Header />
              {children}
              <Footer />
            </SnackbarProvider>
          </QueryClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
