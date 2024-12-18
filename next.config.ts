import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // ou une autre taille qui convient, comme "2mb" ou "5mb"
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tx41fcbjdi0olrou.public.blob.vercel-storage.com",
        pathname: "/**", // Autorise tous les chemins de ce domaine
      },
    ],
  },
};

export default nextConfig;
