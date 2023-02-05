const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/Main.ts'),
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'js/Main.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/'
          }
        }
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html")
      }),
      new CleanWebpackPlugin()
  ],
  mode: 'development'
};