const glob = require('glob')
const path = require('path')

const getStylePath = () => {
  const results = glob.sync(`*/styles/*.js`, { cwd: path.join(process.cwd(), 'src') })
  return results.map(i => `./src/${i}`)
}
module.exports = getStylePath
