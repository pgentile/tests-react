const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: {
    app: [
      './src/main.jsx',
      './src/main.scss',
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    alias: {
      'chart.js': 'chart.js/src/chart.js',
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        oneOf: [
          // Apply Babel on all source files
          {
            exclude: /node_modules/,
            use: [
              'babel-loader?cacheDirectory',
            ],
          },
          // Apply Babel on Foundation Sites: it doesn't provide a compiled version
          {
            include: /node_modules\/(foundation-sites)/,
            use: [
              'babel-loader?cacheDirectory',
            ],
          },
          // Load files, but disable their .babelrc config
          {
            use: [
              'babel-loader?cacheDirectory&babelrc=false',
            ],
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(ttf|eot|woff2?|svg|png|jpg|jpe|jpeg|gif|webp)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    // Optimize module concatenation
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Add an explicit name to each module
    // Should be removed in prod mode
    new webpack.NamedModulesPlugin(),

    // fetch as standard API
    new webpack.ProvidePlugin({
      'fetch': 'isomorphic-fetch',
    }),

    // All dependencies found in node_modules in the vendor file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.includes('node_modules');
      },
    }),

    // CSS in its own file
    new ExtractTextPlugin('[name].css'),

    // Don't import all locales from moment.js
    // See https://webpack.js.org/plugins/context-replacement-plugin/
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/),

    // Replace lodash-es imports by equivalent lodash imports.
    // Otherwise, same lodash functions can be loaded twice !
    new webpack.NormalModuleReplacementPlugin(
      /lodash-es/,
      resource => {
        resource.request = resource.request.replace('lodash-es', 'lodash');
      }
    ),
  ],
};
