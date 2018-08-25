const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  name: 'renderer',
  devtool: 'cheap-module-source-map',
  target: 'web',
  mode: 'production',
  entry: ['babel-polyfill', './src/renderer.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname, 'dist')
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            keep_fnames: true,
          },
        }
      })
    ]
  }
};
