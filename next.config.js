/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
      "@mui/icons-material": {
        transform: "@mui/icons-material/{{member}}",
      },
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
            port: "8000",
            pathname: "/media/**",
          },
        ],
      },
    };
  }

  const backendUrl = new URL(process.env.NEXT_PUBLIC_API_HOST);
  return {
    ...nextConfig,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: backendUrl.hostname,
          port: "443",
          pathname: "/media/**",
        },
      ],
    },
  };
};
