const config = require('./config')

module.exports = {
  resolve: {
    alias: config.webpack.alias,
    extensions: ['.js', '.json', '.jsx'],
  },
}

