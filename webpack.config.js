const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: [
              /node_modules[\\\/]core-js/,
              /node_modules[\\\/]webpack[\\\/]buildin/],
              presets: ['@babel/preset-env', `@babel/preset-react`],
          }
        }
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/build',
    },
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}