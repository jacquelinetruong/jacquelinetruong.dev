import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

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
            {
                protocol: 'https',
                hostname: 'www.notion.so',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.notionusercontent.com',
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

    async headers() {
        return [
        {
            // cache static assets
            source: '/:all*(svg|jpg|jpeg|png|webp|gif|woff|woff2|ttf|otf)',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
            },
            ],
        },
        ];
    },
};

export default nextConfig;
