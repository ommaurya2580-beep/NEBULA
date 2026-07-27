import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CanvasWrapper } from "../components/canvas/CanvasWrapper";
import { DebugPanel } from "../ui/DebugPanel";
import { OverlayManager } from "../components/ui/OverlayManager";
import { CustomCursor } from "../components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROJECT NEBULA",
  description: "A premium interactive real-time experience platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-hidden">
        <CanvasWrapper />
        
        {/* UI Overlay */}
        <OverlayManager />
        
        <CustomCursor />
        <DebugPanel />
        <div style={{ display: 'none' }}>{children}</div>
      </body>
    </html>
  );
}
