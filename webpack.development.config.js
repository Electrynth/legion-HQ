const webpack = require('webpack');
const path = require('path');

module.exports = {
  name: 'renderer',
  devtool: 'source-map',
  target: 'web',
  mode: 'development',
  entry: ['babel-polyfill', './src/renderer.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
