const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
  dotenv.config();

  const prod = process.env.NODE_ENV === 'production';

  return {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist/'),
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.js', '.json', '.tsx', '.ts', '.svg'],
          },
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};
