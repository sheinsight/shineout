const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

delete pkg.scripts
delete pkg.devDependencies

fs.writeFileSync(path.resolve(__dirname, '../publish/package.json'), JSON.stringify(pkg, null, 2))
