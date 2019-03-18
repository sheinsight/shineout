const fs = require('fs')
const pkg = require('../package.json')
const rimraf = require('rimraf')

const version = `${pkg.version.substr(0, pkg.version.lastIndexOf('.') + 1)}x`
const dir = `gh-pages/${version}`

if (fs.existsSync(dir)) {
  rimraf.sync(dir)
}
