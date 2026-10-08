const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const glob = require('glob')

const tempDir = path.resolve(__dirname, '../.temp/')
const srcDir = path.resolve(__dirname, '../src/')

function transTs() {
  if (fs.existsSync(tempDir)) {
    rimraf.sync(tempDir)
  }
  execSync(`cp -R ${srcDir} ${tempDir}`)
  try {
    execSync(`tsc --project ${srcDir}`, { stdio: 'inherit' })
  } catch (e) {
    // tsc 有类型错误时仍会输出文件, 若继续构建会把 .ts/.tsx 源文件带进产物, 因此直接中断构建
    console.error('tsc 编译失败, 构建中断')
    process.exit(1)
  }
  fs.unlinkSync(path.resolve(tempDir, 'tsconfig.json'))
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
