const { execSync } = require('child_process')
const bulidTS = require('./build-ts')

execSync(`cross-env NODE_ENV=publish babel src --out-dir publish/css && cp -R publish/css/* publish/lib`)
bulidTS()
