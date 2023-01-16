const fs = require('fs')
const less = require('less')
const path = require('path')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const glob = require('glob')
const { execSync } = require('child_process')

const cssRoot = path.resolve(__dirname, '../publish/css')
const libRoot = path.resolve(__dirname, '../publish/lib')

async function render(data, setting) {
  return new Promise((resolve, reject) => {
    less.render(data, setting, (err, d) => {
      if (err) {
        reject(err)
        return
      }
      resolve(d.css)
    })
  })
}

function buildCss(stylePath) {
  const targetPath = path.resolve(cssRoot, stylePath)
  const sourcePath = path.resolve(libRoot, stylePath)

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath)
  }

  fs.readdirSync(sourcePath)
    .filter(name => name.indexOf('.less') > 0)
    .forEach(async name => {
      const fn = path.resolve(sourcePath, name)
      const cssFile = path.resolve(targetPath, name).replace('.less', '.css')
      const lessText = fs.readFileSync(fn).toString()
      const cssText = await render(lessText, { filename: fn })

      postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })])
        .process(cssText)
        .then(result => {
          fs.writeFileSync(cssFile, result.css)
        })
        .catch(e => console.log(e))
    })
}

function replaceLess(d) {
  const dir = path.resolve(cssRoot, d)
  fs.readdirSync(dir)
    .filter(name => /\.(js|ts)$/.test(name))
    .forEach(name => {
      const filePath = path.resolve(dir, name)
      const text = fs
        .readFileSync(filePath)
        .toString()
        .replace(/\.less/g, '.css')
      fs.writeFileSync(filePath, text)
    })
}

execSync(`cp -r ${libRoot} ${cssRoot}`)
// 删除less
glob('**/*.less', { cwd: cssRoot }, (error, files) => {
  files.forEach(p => {
    const tempPath = path.resolve(cssRoot, p)
    fs.unlinkSync(tempPath)
  })
})
// 编译 less
glob('*/styles/', { cwd: libRoot }, (error, files) => {
  files.concat(['styles/']).forEach(p => {
    buildCss(p)
    replaceLess(p)
  })
})
