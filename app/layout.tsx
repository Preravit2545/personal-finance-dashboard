import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const roboto = Raleway({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Finance Dashboard by Preravit Sroemsakunwat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
