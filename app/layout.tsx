// Added missing React import to fix namespace error for React.ReactNode
import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "../context/AuthContext";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: "CNA Racing Hub",
  description: "The official portal for CNA Racing league in iRacing. Featuring race schedules, real-time countdowns, driver statistics, a global driver map, and endurance team matchmaking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  // Fixed: Cannot find namespace 'React' by importing React at the top of the file
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}