const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = function getCommon(config) {
  const lessLoader = [
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
          use: lessLoader,
        },

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
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
      new MiniCssExtractPlugin({
        filename: `${config.extractTextPluginPath}`,
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
