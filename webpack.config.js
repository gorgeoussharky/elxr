/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/**
 * Webpack main configuration file
 */

const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const views = fs.readdirSync(path.resolve(__dirname, environment.paths.source, 'views'))
  .filter((file) => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = views.map(function (template) {
  return new HTMLWebpackPlugin({
    inject: true,
    hash: false,
    filename: template,
    template: path.resolve(environment.paths.source, 'views', template),
    favicon: path.resolve(environment.paths.source, 'assets/img', 'favicon.ico'),
    templateParameters: {
      data: require('./src/views/data/data.json'),
    },
    minify: false,
  });
});
htmlPluginEntries.push(new PreloadWebpackPlugin());

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'assets/js', 'index.js'),
  },
  output: {
    filename: 'assets/js/[name].js',
    path: environment.paths.output,
    publicPath: '',
  },
  module: {
    rules: [
      // Vue SFC
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
        }, ],
      },
      // Ejs
      {
        test: /\.ejs$/,
        exclude: /node-modules/,
        use: [{
          loader: 'ejs-loader',
          options: {
            esModule: false,
          }
        }, ],
      },
      // JS / TS
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file) &&
          /local_modules/.test(file)
        ),
        use: ['babel-loader'],
      },
      // Unit test
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
      // Images
      {
        test: /\.(png|gif|jpe?g)$/i,
        exclude: /node-modules/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[folder]/[name].[hash:6].[ext]',
            outputPath: 'assets/img/',
            esModule: false,
            limit: environment.limits.images,
          },
        }, ],
      },
      {
        test: /\.svg$/,
        use: [{
            loader: 'url-loader',
            options: {
              name: '[folder]/[name].[hash:6].[ext]',
              outputPath: 'assets/img/',
              esModule: false,
              limit: environment.limits.images,
              mimetype: 'image/svg+xml',
            },
          },
          {
            loader: 'svgo-loader',
          }
        ],
      },
      // Videos
      {
        test: /\.(mp4|webm)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[folder]/[name].[hash:6].[ext]',
            outputPath: 'assets/video/',
            esModule: false,
            limit: 0,
          },
        }, ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:6].[ext]',
            outputPath: 'assets/fonts/',
            limit: environment.limits.fonts,
            esModule: false,
          },
        }, ],
      },
    ],
  },
  plugins: [
    // Clean dist folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new ImageminWebpWebpackPlugin({
      overrideExtension: false,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: 'jquery',
      _: "lodash"
    }),
    new VueLoaderPlugin(),
  ].concat(htmlPluginEntries),
  target: 'web',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, environment.paths.source),
      '@assets': path.resolve(__dirname, environment.paths.source, 'assets'),
      '@html': path.resolve(__dirname, environment.paths.source, 'views'),
      '@parts': path.resolve(__dirname, environment.paths.source, 'views/templates'),
      '@data': path.resolve(__dirname, environment.paths.source, 'views/data'),
      '@img': path.resolve(__dirname, environment.paths.source, 'assets/img'),
      '@ph': path.resolve(__dirname, environment.paths.source, 'assets/img/placeholder'),
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
  },
  externals: {
    jquery: 'jQuery',
  },
};