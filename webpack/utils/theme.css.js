const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../../config')

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

module.exports = function({ name, entry, output, clean, prefix = 'theme' }) {
  const conf = {
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    entry,
    resolve: {
      alias: config.webpack.alias,
    },
    output: {
      ...output,
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
      }),
    )
  }

  return conf
}
