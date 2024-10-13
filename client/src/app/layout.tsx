import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProvider from "@/providers/AllProvider";

export const metadata: Metadata = {
  title: "Board Games",
  description:
    "Batch Tools offers a wide range of powerful, easy-to-use, and completely free tools to simplify working with files. Effortlessly convert document formats, remove backgrounds, generate QR codes, transcribe videos, merge PDFs, convert HTML to PDF, transform PDFs to JPG, convert JSON to CSV, and much more - all in one place!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[#ffffff] text-black dark:bg-[#000000] dark:text-white"
        suppressHydrationWarning
      >
        <AllProvider>
          <Header />
          <main className=" mt-28">{children}</main>
          <Footer />
        </AllProvider>
      </body>
    </html>
  );
}
