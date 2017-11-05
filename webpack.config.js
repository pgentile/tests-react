const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Load packages names
const packageContent = require('./package.json');
const vendorLibs = Object.keys(packageContent.dependencies);


module.exports = {
  entry: {
    app: [
      './src/main.jsx',
      './src/main.scss',
    ],
    vendor: vendorLibs,
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    alias: {
      'jquery': 'jquery/src/jquery',
      'chart.js': 'chart.js/src/chart.js',
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: [
          'eslint-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: [
          'babel-loader?cacheDirectory&babelrc=false',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?cacheDirectory',
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
            'sass-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|gif)$/,
        use: [
          'url-loader?limit=100000',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'fetch': 'isomorphic-fetch',
    }),
    new ExtractTextPlugin('[name].css'),
  ],
};
