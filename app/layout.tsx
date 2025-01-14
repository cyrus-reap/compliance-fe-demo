"use client";

import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AntdThemeProvider } from "@/components/AntdThemeProvider";
import { LayoutProvider } from "@/app/layoutContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Spin } from "antd";
import "./globals.css";
import "antd/dist/reset.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <AntdThemeProvider>
            <LayoutProvider>
              <Suspense
                fallback={
                  <div className="flex justify-center items-center min-h-screen bg-white">
                    <Spin size="large" />
                  </div>
                }
              >
                {children}
              </Suspense>
            </LayoutProvider>
          </AntdThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
