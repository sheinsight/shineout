const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = function getCommon(config) {
  function getCssOption() {
    const { LOCAL_IDENT_NAME, NODE_ENV } = process.env
    const options = { minimize: NODE_ENV === 'production' }

    if (!LOCAL_IDENT_NAME) return options

    return Object.assign(options, { modules: true, localIdentName: LOCAL_IDENT_NAME })
  }

  function getLoaderOption(name) {
    let options = [
      {
        loader: 'css-loader',
        options: getCssOption(),
      },

      {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [
              autoprefixer,
            ]
          },
        },
      },
    ]

    if (name === 'less') {
      options = options.concat([
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'so-prefix': process.env.SO_PREFIX || 'shineout',
              ...config.modifyVars,
            },
          },
        },
      ])
    }

    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: options,
    })
  }

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
          use: {
            loader: 'babel-loader',
          },
        },

        {
          test: /\.less$/,
          use: getLoaderOption('less'),
        },

        {
          test: /\.css/,
          use: getLoaderOption('css'),
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
