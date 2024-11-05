import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["img.clerk.com", "imgs.search.brave.com"], // Add the domain of your image source
	},
	// Other config options here
};

export default nextConfig;
