// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  async rewrites() {
    return [
      {
        source: "/api/challenge/banks", // Ruta local
        destination: "https://dev.obtenmas.com/catom/api/challenge/banks", // URL externa
      },
    ];
  },
};

export default nextConfig;
