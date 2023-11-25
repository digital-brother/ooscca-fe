import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'OOSCCA',
  description: 'OOSCCA',
};


export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body>
    <ThemeRegistry>
      <Header/>
      <Box maxWidth={1200} sx={{
        mx: "auto",
        px: {xs: 2, sm: 5, md: 10},
        pt: {xs: 2, sm: 5, md: 10},
        pb: 0,
      }}>
        {children}
      </Box>
      <Footer/>
    </ThemeRegistry>
    </body>
    </html>
  );
}
