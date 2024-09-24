/* eslint-disable import/no-dynamic-require */
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const mianPackage = require(path.resolve(__dirname, '../package.json'))
const { version } = mianPackage

// 获取version中的 tag 比如 2.0.0-alpha.1 中的 alpha
let tag = (version.split('-')[1] || '').split('.')[0] || 'latest-2'
if (tag === 'rc') {
  tag = 'next-2'
}
const mainVersion = version.split('.')[0]
if (mainVersion !== '2') {
  console.error('version 不是 2.x.x')
  process.exit(1)
}

console.log('version', version)
console.log('tag', tag)

const validateFile = () => {
  const distPath = path.resolve(__dirname, `../publish/dist`)
  if (!fs.existsSync(distPath)) {
    console.error(`${distPath} 不存在`)
    process.exit(1)
  }
  const esPath = path.resolve(__dirname, `../publish/es/index.js`)
  const cjsPath = path.resolve(__dirname, `../publish/lib/index.js`)
  if (!fs.existsSync(esPath) || !fs.existsSync(cjsPath)) {
    console.error(`${esPath} 或 ${cjsPath} 不存在`)
    process.exit(1)
  }
  const umdPath = path.resolve(__dirname, `../publish/dist/shineout.min.js`)
  if (!fs.existsSync(umdPath)) {
    console.error(`${umdPath} 不存在`)
    process.exit(1)
  }
}

const publishPackage = () => {
  const distPath = path.resolve(__dirname, `../publish`)
  exec(`npm publish ${distPath} --access public${tag ? ` --tag ${tag}-2` : ''}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error occurred:', error)
      console.error('Standard error output:', stderr)
      process.exit(1)
      return
    }
    console.log('Standard output:', stdout)
  })
}

try {
  validateFile()
  publishPackage()
} catch (error) {
  console.log('Publish error:', error)
  process.exit(1)
}
