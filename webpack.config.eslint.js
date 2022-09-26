const config = require('./config')

module.exports = {
  resolve: {
    alias: config.webpack.alias,
    extensions: ['.js', '.ts', '.json', '.jsx', '.tsx', '.d.ts'],
  },
}
