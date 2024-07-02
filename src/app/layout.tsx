import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/supabaseProvider";
import { Suspense } from "react";
import Loading from "./_components/Loading";
import { ThemeProvider } from "./ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "English With Suits",
  description: "Suits로 배우는 비즈니스 영어회화",
  openGraph: {
    title: "English With Suits",
    description: "Suits로 배우는 비즈니스 영어회화",
    images: [
      {
        url: process.env.POSTER_IMAGE as string,
        width: 800,
        height: 600,
        alt: "Suits Poster",
      },
    ],
  },
  twitter: {
    title: "English With Suits",
    description: "Suits로 배우는 비즈니스 영어회화",
    images: {
      url: process.env.POSTER_IMAGE as string,
      alt: "Suits Poster",
    },
  },
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="H9ozdhnGtWaEwS87AMdhNNow2KjahdkrMFDEgDdeoh8"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<Loading />}>
              <div>{auth}</div>
              {children}
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
