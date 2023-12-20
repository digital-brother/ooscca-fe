import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from "@/app/Header";
import Footer from "@/app/Footer";

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
      {children}
      <Footer/>
    </ThemeRegistry>
    </body>
    </html>
  );
}
