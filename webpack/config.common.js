const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = function getCommon(config) {
  function getCssOption(name) {
    const cssModule = config.cssModule || {}
    const options = { importLoaders: 1 }
    if (!cssModule[name]) return options

    return Object.assign(options, { modules: true, localIdentName: cssModule[name] })
  }

  function getPreLoader(name) {
    return config.preloader ? config.preloader[name] || [] : []
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

    if (name === 'sass') {
      options = options.concat([
        {
          loader: 'sass-loader',
        },
        ...getPreLoader(name),
      ])
    }

    if (name === 'less') {
      options = options.concat([
        {
          loader: 'less-loader',
          options: {
            modifyVars: config.modifyVars,
          },
        },
        ...getPreLoader(name),
      ])
    }

    if (config.extractTextPluginPath.length === 0) {
      options.unshift({ loader: 'style-loader' })
      return options
    }

    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: options,
    })
  }

  function getPlugins() {
    const plugins = []

    if (config.chunkOptions) {
      plugins.push(new webpack.optimize.CommonsChunkPlugin(config.chunkOptions))
    }
    if (config.extractTextPluginPath.length > 0) {
      plugins.push(new ExtractTextPlugin({
        filename: config.extractTextPluginPath,
        allChunks: true,
      }))
    }

    return plugins
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
                name: config.imagePath,
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

    plugins: getPlugins(),
  }
}
