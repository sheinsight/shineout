const { readFileSync, writeFileSync } = require('fs')

const { execSync } = require('child_process')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

const esmDir = path.resolve(__dirname, '../publish/es')

const babelESMConfigName = '.es.babel.config.json'
const babelConfig = JSON.parse(readFileSync('.babelrc', 'utf8')).env.publish
const index = babelConfig.presets.findIndex(item => item && item[0] === '@babel/preset-env')
babelConfig.presets[index][1].modules = false
writeFileSync(babelESMConfigName, JSON.stringify(babelConfig, null, 2), 'utf8')

execSync(`cp -R .temp ${esmDir}`)
execSync(
  `babel --no-babelrc --config-file ./${babelESMConfigName} .temp --out-dir ${esmDir} && rm ./${babelESMConfigName}`
)
// 删除.jsx文件
glob('**/*.jsx', { cwd: esmDir }, (error, files) => {
  files.forEach(name => fs.unlinkSync(path.resolve(esmDir, name)))
})
