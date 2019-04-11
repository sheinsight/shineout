const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../../config')
const webpack = require('webpack')

const lessLoader = (name, hot) => {
  const loaders = [
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
  if (hot) loaders.splice(0, 0, { loader: 'css-hot-loader' })
  return loaders
}

module.exports = function({
  name,
  hot,
  entry,
  output,
  clean,
  prefix = 'theme',
  mode = 'production',
  filename = '_temp.file',
}) {
  const conf = {
    mode,
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    entry,
    resolve: {
      alias: config.webpack.alias,
    },
    output: {
      ...output,
      filename,
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: lessLoader(name, hot),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: prefix ? `${prefix}.${name}.css` : `${name}.css`,
      }),
    ],
  }

  if (clean) {
    conf.plugins.push(
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ['_temp.file'],
      })
    )
  }
  if (hot) conf.plugins.push(new webpack.HotModuleReplacementPlugin())
  return conf
}
