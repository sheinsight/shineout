const { readFileSync, writeFileSync } = require('fs')

const { execSync } = require('child_process')

const babelESMConfigName = '.es.babel.config.json'
const babelConfig = JSON.parse(readFileSync('.babelrc', 'utf8')).env.publish
const index = babelConfig.presets.findIndex(item => item && item[0] === '@babel/preset-env')
babelConfig.presets[index][1].modules = false
writeFileSync(babelESMConfigName, JSON.stringify(babelConfig, null, 2), 'utf8')

execSync(`cp -R src publish/es`)
execSync(
  `babel --no-babelrc --config-file ./${babelESMConfigName} src --out-dir publish/es && rm ./${babelESMConfigName}`
)
