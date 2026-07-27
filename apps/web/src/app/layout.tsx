import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NebulaCanvas } from "../components/canvas/NebulaCanvas";
import { DebugPanel } from "../ui/DebugPanel";

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
        <NebulaCanvas>
          {/* WebGL Scene will mount here */}
        </NebulaCanvas>
        
        {/* UI Overlay */}
        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', width: '100%', height: '100%' }}>
          {children}
        </div>
        
        <DebugPanel />
      </body>
    </html>
  );
}
