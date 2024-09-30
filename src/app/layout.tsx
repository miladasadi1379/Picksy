import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "@/styles/theme/Providers";
import Navbar from '@/components/header/Navbar'
import PhoneNavbar from '@/components/header/PhoneNavbar'
import Footer from '@/components/footer/Footer'
import { SimpleGrid } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "فروشگاه پیکسی",
  description: "یه فروشگاه خودمونی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body style={{ minHeight: '100vh' }}>
        <Providers>
          <SimpleGrid >
            <Navbar />
            <Suspense fallback={<p>در حال بارگذاری...</p>}>
              {children}
            </Suspense>
            <PhoneNavbar />
            <Footer />
            <ToastContainer />
          </SimpleGrid>
        </Providers>
      </body>
    </html>
  );
}
