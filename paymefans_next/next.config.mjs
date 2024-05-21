/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/photos/**",
            },
            {
                protocol: "https",
                hostname: "videos.pexels.com",
                pathname: "/video-files/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/images/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/attachments/**"
            },
        ],
    },
};

export default nextConfig;
