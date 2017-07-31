const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: ['./scripts/app.js', './styles/main.scss'],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: '4200'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-0'] },
        }],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract([
          'css-loader', 'sass-loader'
        ]),
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.bundle.css',
      allChunks: true,
    }),
  ],
};
