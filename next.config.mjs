/** @type {import('next').NextConfig} */
const nextConfig = {
  // required so taht google images can be load if the user sign in from google account.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
