const fs = require('fs')
const less = require('less-compile-file')
const path = require('path')

const root = path.resolve(__dirname, '../src')
const publish = path.resolve(__dirname, '../publish')

function buildCss(stylePath) {
  const originPath = path.resolve(root, stylePath)
  const distPath = path.resolve(publish, 'lib', stylePath)
  fs.readdirSync(originPath).filter(name => name.indexOf('.less') > 0)
    .forEach(async (name) => {
      const fn = path.resolve(originPath, name)
      await less(fn, path.resolve(distPath, name.replace('.less', '.css')))
    })
}

buildCss('styles')
buildCss('Spin/styles')
