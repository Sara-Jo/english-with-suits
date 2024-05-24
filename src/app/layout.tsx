import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "./auth/supabaseProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <SupabaseProvider>
          <div>{auth}</div>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
