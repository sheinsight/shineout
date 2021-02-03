const webpack = require('webpack')
const merge = require('webpack-merge')
const os = require('os')
const config = require('../config')
const common = require('./config.common')
const cssConf = require('./utils/theme.css')

function getIPAddress() {
  if (process.env.USE !== 'IP') return 'localhost'
  const interfaces = os.networkInterfaces()
  let address = null

  Object.keys(interfaces).filter(env => {
    const iface = interfaces[env].find(obj => {
      if (obj.family === 'IPv4' && obj.address !== '127.0.0.1' && !obj.internal) return true
      return false
    })
    if (iface) {
      // eslint-disable-next-line prefer-destructuring
      address = iface.address
      return true
    }
    return false
  })

  if (address) {
    return address
  }
  return 'localhost'
}

const IPAdress = getIPAddress()

function getEntry(entry) {
  const newEntry = {}
  Object.keys(entry).forEach(key => {
    newEntry[key] = [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${IPAdress}:${config.dev.webpackPort}`,
      'webpack/hot/only-dev-server',
      entry[key],
    ]
  })
  return newEntry
}

function getPublishPath() {
  if (config.dev.publishPort === 80) return `http://${IPAdress}/`
  return `http://${IPAdress}:${config.dev.publishPort}/`
}

const cssConfig = config.themes.map(name =>
  cssConf({
    mode: 'development',
    hot: true,
    name,
    entry: [
      `webpack-dev-server/client?http://${IPAdress}:${config.dev.webpackPort}`,
      'webpack/hot/only-dev-server',
      './src/styles/normalize.less',
      './src/styles/expose.js',
      './src/styles/index.js',
      './src/styles/spin.js',
      // site style
      './site/styles/index.js',
      './site/less-entry.js',
    ],
    output: { publicPath: getPublishPath() },
    clean: false,
    filename: '__css_hot_loader.js',
    prefix: '',
  })
)

const jsConfig = merge(common({ ...config.webpack, DEV: true }), {
  devtool: config.webpack.devtool,
  entry: getEntry(config.webpack.entry),
  output: {
    filename: '[name].js',
    publicPath: getPublishPath(),
    libraryTarget: 'umd',
  },
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

module.exports = [jsConfig, ...cssConfig]
