/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    domains: ["marsfxkmubnnoqmlrbno.supabase.co", "localhost"],
  },
};

export default nextConfig;
