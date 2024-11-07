import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // カスタムWebpack設定をここに追加
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    // 必要に応じて、追加の設定をここに記述

    return config;
  },
};

export default nextConfig;