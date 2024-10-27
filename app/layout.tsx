/* eslint-disable */
"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const metadata: Metadata = {
  title: "Space X Dashboard",
  description: "View Your Capsules!",
};
console.log(metadata);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </PrimeReactProvider>
    </Provider>
  );
}
