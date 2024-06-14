import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/supabaseProvider";
import { Suspense } from "react";
import Loading from "./_components/Loading";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "English with Suits",
  description: "Learn English with Suits",
  icons: {
    icon: "/favicon.ico",
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
      <body className={archivo.className}>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <div>{auth}</div>
            {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
