var path = require('path');
var webpack = require('webpack');

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
      ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: 'source-map',
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
    /*
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    */
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
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
  ]
};
