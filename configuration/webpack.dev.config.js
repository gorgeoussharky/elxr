/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
const {
  merge
} = require('webpack-merge');

const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');


module.exports = merge(webpackConfiguration, {
  mode: 'development',

  /* Manage source maps generation process */
  devtool: 'eval-source-map',
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },

    ],
  },

  devServer: {
    open: false,
    client: {
      progress: true,
      logging: 'none',
    },
    watchFiles: [path.resolve(environment.paths.source, 'views', '*.html'), path.resolve(environment.paths.source, 'views/templates', '*.ejs')],
    historyApiFallback: true,
    compress: true,
    ...environment.server,
  },

  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  plugins: [
    new ESLintPlugin({
      exclude: ['node_modules', 'local_modules', 'backend'],
      extensions: ['js', 'ts'],
    }),
    new StylelintPlugin(),
  ],
});