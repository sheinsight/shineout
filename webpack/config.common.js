const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = function getCommon(config) {
  /*
  function getCssOption() {
    const { LOCAL_IDENT_NAME, NODE_ENV } = process.env
    const options = { minimize: NODE_ENV === 'production' }

    if (!LOCAL_IDENT_NAME) return options

    return Object.assign(options, { modules: true, localIdentName: LOCAL_IDENT_NAME })
  }
  */

  const lessLoader = [
    {
      loader: 'css-loader',
      // options: getCssOption(),
      options: { minimize: process.env.NODE_ENV === 'production' },
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: {
          'so-prefix': process.env.SO_PREFIX || 'so',
          ...config.modifyVars,
        },
      },
    },
  ]

  return {
    externals: config.externals,

    resolve: {
      alias: config.alias,
      extensions: ['.js', '.json', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: config.useHappyPack ?
            {
              loader: 'happypack/loader?id=js',
            } :
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
        },

        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: lessLoader,
          }),
        },

        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: './images/[name].[ext]',
              },
            },
          ],
        },

        {
          test: /\.(ttf|eot|woff|woff2|otf|svg)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './font/[name].[ext]',
              },
            },
          ],
        },

        {
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },

    plugins: [
      new ExtractTextPlugin({
        filename: `${config.extractTextPluginPath}`,
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          SO_PREFIX: JSON.stringify(process.env.SO_PREFIX || ''),
          CSS_MODULE: !!process.env.LOCAL_IDENT_NAME,
        },
      }),
    ],
  }
}
