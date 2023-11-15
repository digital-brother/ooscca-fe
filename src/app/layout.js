import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from "@/components/header";
import Footer from "@/components/footer";

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
      <Box maxWidth={1200} mx="auto" px={5}>
        {children}
      </Box>
      <Footer/>
    </ThemeRegistry>
    </body>
    </html>
  );
}
