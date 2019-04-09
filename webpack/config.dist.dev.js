const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const common = require('./config.common')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const lessLoader = name => [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
  },
  {
    loader: 'less-loader',
    options: {
      modifyVars: {
        'so-prefix': process.env.SO_PREFIX || 'so',
        'so-theme': name,
      },
    },
  },
]

const cssConfig = config.themes.map(name => ({
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  entry: ['./src/styles/normalize.less', './src/styles/expose.js', './src/styles/index.js', './src/styles/spin.js'],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../publish/dist'),
    filename: '_temp.file',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: lessLoader(name),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `theme.${name}.css`,
    }),
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['_temp.file'],
    }),
  ],
}))

const jsConfig = merge(common({ ...config.webpack, IGNORE_LESS: true }), {
  stats: { children: false },
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../publish/dist'),
    libraryTarget: 'umd',
    library: 'Shineout',
    filename: 'shineout.js',
  },
  mode: 'development',
})
module.exports = [jsConfig, ...cssConfig]
