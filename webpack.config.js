const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;
  const filename = (ext) => (isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`);

  const plugins = () => {
    const Plugins = [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CopyPlugin({
        patterns: [{
          from: path.resolve(__dirname, 'src/assets/favicon', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/sound', 'clc1.mp3'),
          to: path.resolve(__dirname, 'dist/sound'),
        }],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
    ];
    if (isDev) Plugins.push(new ESLintPlugin());
    return Plugins;
  };

  return {
    entry: {
      main: './src/assets/js/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    devServer: {
      port: '3000',
      open: true,
      hot: true,
    },
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',

          ],
        },

      ],
    },

  };
};
