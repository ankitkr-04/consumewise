import { Toaster } from "@/components/ui/toaster";
import { inter, jetbrain, pacifico } from "@/lib/fonts";
import "@/styles/globals.css";
import React from "react";

export const metadata = {
  title: "ConsumeWise",
  description: "An AI-powered platform to help you make better decisions",
  icons: ['/assets/logo/care-logo.svg']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${pacifico.variable} ${jetbrain.variable} font-sans antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
