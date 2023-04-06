const config = require('./config')

module.exports = {
  resolve: {
    alias: config.webpack.alias,
    extensions: ['.ts', '.js','.tsx', '.json', '.jsx', '.d.ts'],
  },
}
