const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator')
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// Load packages names
const packageContent = require('./package.json');
const vendorLibs = Object.keys(packageContent.dependencies);


module.exports = validate({
  entry: {
      app: [
        './src/main.jsx',
        './src/main.scss',
      ],
      vendor: vendorLibs,
  },
  resolve: {
    alias: {
        'jquery': 'jquery/src/jquery',
        'chart.js': 'chart.js/src/chart.js',
    },
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
          test: /\.jsx?$/,
          loaders: [
            'babel?cacheDirectory',
          ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        loader: 'url?limit=100000',
      },
    ],
  },
  plugins: [
    /*
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    */
    /*
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
    */
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'fetch': 'isomorphic-fetch',
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
});
