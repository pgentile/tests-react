var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
      app: './src/main.jsx',
      vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
        'react-bootstrap',
        'lodash',
        'jquery',
        'bootstrap',
      ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: 'eval-source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['jshint'],
        include: 'src'
      }
    ],
    loaders: [
      {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            cacheDirectory: true
          }
      },
      {
          test: /\.jsx$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'],
            cacheDirectory: true
          }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    /*
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    */
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
    new ExtractTextPlugin('bundle.css')
  ]
};
