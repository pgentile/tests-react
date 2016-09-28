var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
      app: [
        './src/main.jsx',
        './src/main.scss',
      ],
      /*
      vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
        'foundation-sites',
        'react-foundation',
        'redux',
        'react-redux',
        'jquery',
      ],
      */
  },
  resolve: {
    alias: {
        jquery: 'jquery/src/jquery',
    },
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      test: /\.jsx?$/,
      loader: 'eslint',
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    */
    /*
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
    */
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'fetch': 'isomorphic-fetch',
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css'),
  ],
};
