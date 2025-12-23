import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

    async redirects() {
        return [
            {
                source: '/resume',
                destination: '/Resume%20-%20Jacqueline Truong%20-%20Dec2025.pdf',
                permanent: true,
            },

            {
                source: '/resume.pdf',
                destination: '/Resume%20-%20Jacqueline Truong%20-%20Dec2025.pdf',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
