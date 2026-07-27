import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-spring/three",
    "@react-three/postprocessing",
    "gsap",
    "zustand"
  ],
  distDir: "../../.next",
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
