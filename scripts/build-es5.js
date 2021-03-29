const { execSync } = require('child_process')

execSync(`cp -r src/@types publish/lib`)
execSync(`cross-env NODE_ENV=publish babel src --out-dir publish/css && cp -R publish/css/* publish/lib`)
