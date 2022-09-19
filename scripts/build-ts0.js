const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const glob = require('glob')

const tempDir = path.resolve(__dirname, '../.temp')
const srcDir = path.resolve(__dirname, '../src')

function transTs() {
  try {
    if (fs.existsSync(tempDir)) {
      rimraf.sync(tempDir)
    }
    console.log('0000000')
    execSync(`cp -R ${srcDir} ${tempDir}`)
    console.log('111111')
    execSync(`tsc --outDir ${tempDir} --decoration`)
  } catch (e) {
    console.error('err', e)
  }
  // 删除 ts 文件
  glob('**/*.@(ts|tsx)', { cwd: tempDir }, (error, files) => {
    try {
      files.forEach(file => {
        const filePath = path.resolve(tempDir, file)
        if (!filePath.endsWith('.d.ts')) {
          fs.unlinkSync(filePath)
        }
      })
    } catch (e) {
      console.error(e)
    }
  })
}

transTs()
