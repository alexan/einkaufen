'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')


const SUPPORTED_BROWSERS = [ 'last 2 version' ]

const dist = './dist'
const appDir = './app'
const production = process.env.NODE_ENV === 'production'

let plugins = [
   new webpack.DefinePlugin({
      ENV: {
            isProd: production,
            isDev: !production,
            isZeit: !!process.env.NOW,
      }
   }),
   new ExtractTextPlugin({filename: '[name].[contenthash].css', disable: !production}),
   new HtmlWebpackPlugin({
      template: 'app/index.html',
      hash: false,
      title: 'Future Packaging',
      minify: production ?  {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            html5: true,
            minifyCSS: true,
            removeComments: true,
            removeEmptyAttributes: true,
          } : false
      }),
      new WebappWebpackPlugin('./app/images/Brille.png')
]

let webpackConfig = {
   devtool: production ? false  : 'inline-source-map',
   mode: production ? 'production' : 'development',
   optimization: {
         splitChunks: {
            chunks: 'all'
         },
         minimize: production
   }, entry: {
      main: path.resolve(appDir, 'entry.js'),
   },
   output: {
      path: path.resolve(dist),
      publicPath: '/',
      filename: production ?'[name].[chunkhash].js' : '[name].js',
   },
   resolve: {
      modules: [
            path.resolve(appDir),
            'node_modules'
      ]
   },
   plugins,
   module: {
      rules: [
            {
               test: /\.(jpg|png|svg|jpeg)$/,
               use: [ 
                  {
                        loader: 'file-loader',
                        options: {
                           name: '[name].[hash].[ext]'
                        }
                  }
               ],
            },
            {
               test: /\.(pdf)$/,
               use: [ 
                  {
                        loader: 'file-loader',
                        options: {
                           name: '[name].[ext]'
                        }
                  }
               ],
            },
            {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               use: [
                  {
                        loader: 'babel-loader',
                        options: {
                           cacheDirectory: true,
                           presets: [
                              ['env', {
                                    targets: {
                                       browsers: SUPPORTED_BROWSERS
                                    }
                              }]
                           ]
                        }
                  }
               ]
            },
            {
               test: /\.pcss$/,
               exclude: /node_modules/,
               use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                        {
                           loader:'css-loader',
                           options: {
                              modules: false,
                              sourceMap: !production,
                              importLoaders: 1,
                              minimize: production
                           }
                        },
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: !production,
                              plugins: (loader) => [
                                    require('postcss-import')(),
                                    require('postcss-cssnext')({
                                       browsers: SUPPORTED_BROWSERS
                                    }),
                              ]
                           }
                        }
                  ]
               })
            },
            {
               test: /\.css$/,
               use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                        {
                           loader:'css-loader',
                           options: {
                              modules: false,
                              sourceMap: !production,
                              importLoaders: 1,
                              minimize: production
                           }
                        }
                  ]
               })
            }
      ]
   },
   devServer:{
      contentBase: path.resolve(appDir),
      port: 8080,
      inline: true,
      hot: false
  },

}

module.exports = webpackConfig




