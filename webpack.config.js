var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
      'babel-polyfill',
      './src/main.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: 'inline-source-map',
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
        }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   mangle: false
    // })
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
};
