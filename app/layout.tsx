"use client";

import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AntdThemeProvider } from "@/components/AntdThemeProvider";
import { LayoutProvider } from "@/app/layoutContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Spin } from "antd";
import { fontConfig } from "@/app/fonts";
import "./globals.css";
import "antd/dist/reset.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontConfig.className} antialiased`}>
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
          <ReactQueryDevtools />
        </QueryClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
