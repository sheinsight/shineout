const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const glob = require('glob')

const tempDir = path.resolve(__dirname, '../.temp/')
const srcDir = path.resolve(__dirname, '../src/')

function transTs() {
  try {
    if (fs.existsSync(tempDir)) {
      rimraf.sync(tempDir)
    }
    execSync(`cp -R ${srcDir} ${tempDir}`)
    execSync(`tsc --project ${srcDir}`)
    fs.unlinkSync(path.resolve(tempDir, 'tsconfig.json'))
  } catch (e) {
    console.error('err', e)
    return
  }
  // 删除 ts 文件
  const files = glob.sync('**/*.@(ts|tsx)', { cwd: tempDir })
  files.forEach(file => {
    const filePath = path.resolve(tempDir, file)
    if (!filePath.endsWith('.d.ts')) {
      fs.unlinkSync(filePath)
    }
  })
}

transTs()
