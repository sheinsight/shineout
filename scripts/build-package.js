const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

delete pkg.devDependencies

const pkgPath = path.resolve(__dirname, '../publish/package.json')
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
