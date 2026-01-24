import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const serverUrl = process.env.SERVER_URL?.replace(/\/$/, "");

    if (!serverUrl) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${serverUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;