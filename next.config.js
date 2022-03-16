/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["links.papareact.com", "platform-lookaside.fbsbx.com", "firebasestorage.googleapis.com", "encrypted-tbn1.gstatic.com"],
	},
};

module.exports = nextConfig;
