import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90, 95] },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/he", destination: "/", permanent: true },
      { source: "/system", destination: "/about", permanent: true },
      { source: "/en/system", destination: "/about", permanent: true },
      { source: "/he/system", destination: "/about", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/he/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
