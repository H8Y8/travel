import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  webpack: (config, { isServer }) => {
    // 只在客戶端構建中應用CSS提取
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        })
      );
    }
    return config;
  },
}; 