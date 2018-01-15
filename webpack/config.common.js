const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')

function getCssOption(name) {
  const cssModule = config.webpack.cssModule || {}
  if (!cssModule[name]) return {}

  return { modules: true, localIdentName: cssModule[name] }
}

function getPreLoader(name) {
  if (!config.preloader) return []
  return config.webpack.preloader[name] || []
}

function getLoaderOption(name) {
  let options = [
    {
      loader: 'css-loader',
      options: getCssOption(name),
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

  if (name !== 'css') {
    options = options.concat([
      {
        loader: `${name}-loader`,
        options: {
          modifyVars: config.webpack.modifyVars,
        },
      },
      ...getPreLoader(name),
    ])
  }

  if (config.webpack.extractTextPluginPath.length === 0) {
    options.unshift({ loader: 'style-loader' })
    return options
  }

  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: options,
  })
}

module.exports = {
  externals: config.webpack.externals,

  resolve: {
    alias: config.webpack.alias,
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
        test: /\.scss$/,
        use: getLoaderOption('sass'),
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
              name: config.webpack.imagePath,
            },
          },
        ],
      },
    ],
  },

  plugins: config.webpack.extractTextPluginPath.length > 0
    ? [new ExtractTextPlugin(config.webpack.extractTextPluginPath)]
    : [],
}
