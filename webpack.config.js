var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
      'babel-polyfill',
      './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: 'inline-source-map',
  module: {
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
  ]
};
