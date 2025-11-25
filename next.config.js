/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile R3F packages to ensure compatibility with Next.js App Router
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // Turn OFF Strict Mode for React Three Fiber stability in dev
  reactStrictMode: false,
};

module.exports = nextConfig;
