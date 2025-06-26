import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/zmb-sosa-page",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
