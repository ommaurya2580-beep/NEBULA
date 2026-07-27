import type { Metadata } from "next";
import "./globals.css";
import { CanvasWrapper } from "../components/canvas/CanvasWrapper";
import { DebugPanel } from "../ui/DebugPanel";
import { OverlayManager } from "../components/ui/OverlayManager";
import { CustomCursor } from "../components/ui/CustomCursor";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-hidden">
        <CanvasWrapper />
        
        {/* UI Overlay */}
        <OverlayManager />
        
        <CustomCursor />
        <DebugPanel />
        {children}
      </body>
    </html>
  );
}
