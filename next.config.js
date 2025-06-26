/** @type {import('next').NextConfig} */

// Log environment variables during build time
console.log('Building with environment variables:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'not set');
console.log('API_TOKEN present:', process.env.API_TOKEN ? 'yes' : 'no');

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_TOKEN: process.env.API_TOKEN,
  },
  // Add webpack config to log environment variables during runtime
  webpack: (config, { isServer }) => {
    if (isServer) {
      console.log('Server-side environment variables:');
      console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'not set');
      console.log('API_TOKEN present:', process.env.API_TOKEN ? 'yes' : 'no');
    }
    return config;
  },
}

module.exports = nextConfig
