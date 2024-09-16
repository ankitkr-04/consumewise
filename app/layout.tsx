import { ThemeProvider } from "@/context/ThemeProvider";
import { inter, jetbrain, pacifico } from "@/lib/fonts";
import "@/styles/globals.css";
import React from "react";

export const metadata = {
  title: "IntelliQ",
  description: "An AI-powered learning platform for students",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
