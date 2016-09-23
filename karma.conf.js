var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    //basePath: '.',
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    preprocessors: {
      '**/*.js': ['webpack'],
      '**/*.jsx': ['webpack'],
    },
    files: [
      'test/**/*.js',
      'test/**/*.jsx',
    ],
    client: {
      mocha: {
        recursive: true,
      },
    },
    webpack: webpackConfig,
  });
};
