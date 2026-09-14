/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "portalfoliosdigitales.blikon.com" },
      { protocol: "https", hostname: "www.foliosdigitales.com" },
      { protocol: "https", hostname: "foliosdigitales.com" },
      { protocol: "https", hostname: "foliosdigitales.blikon.com" },
      { protocol: "https", hostname: "app.foliosdigitalespac.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
