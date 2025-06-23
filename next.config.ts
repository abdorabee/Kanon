import type { NextConfig } from "next";
const nextTranslate = require('next-translate-plugin');

const nextConfig: NextConfig = {
  // Remove i18n configuration from here as it's not supported in App Router
  // Instead, we're using next-translate with the App Router configuration
  // defined in i18n.js
  
  // Disable strict mode for development to prevent double rendering
  reactStrictMode: false,
  
  // Enable experimental features for App Router compatibility
  experimental: {
    // This helps with next-translate integration in App Router
    serverComponentsExternalPackages: ['next-translate']
  }
};

export default nextTranslate(nextConfig);
