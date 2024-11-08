/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["yt3.googleusercontent.com", "i.ytimg.com", "img.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
