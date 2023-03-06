const { execSync } = require('child_process')
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const libDir = path.resolve(__dirname, '../publish/lib')
const rootDir = path.resolve(__dirname, '../.temp')
execSync(`cp -R ${rootDir} ${libDir}`)
execSync(`cross-env NODE_ENV=publish babel ${rootDir} --out-dir ${libDir}`)
// 删除.jsx文件
glob('**/*.jsx', { cwd: libDir }, (error, files) => {
  files.forEach(name => fs.unlinkSync(path.resolve(libDir, name)))
})
