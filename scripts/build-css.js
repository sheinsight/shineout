const fs = require('fs')
const less = require('less')
const path = require('path')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const glob = require('glob')
const { execSync } = require('child_process')

const root = path.resolve(__dirname, '../src')
const publish = path.resolve(__dirname, '../publish')

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
  const originPath = path.resolve(root, stylePath)
  const distPath = path.resolve(publish, 'css', stylePath)

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath)
  }

  fs.readdirSync(originPath)
    .filter(name => name.indexOf('.less') > 0)
    .forEach(async name => {
      const fn = path.resolve(originPath, name)
      const cssFile = path.resolve(distPath, name.replace('.less', '.css'))

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
  const dir = path.resolve(publish, 'css/', d)
  fs.readdirSync(dir)
    .filter(name => /\.js$/.test(name))
    .forEach(name => {
      const filePath = path.resolve(dir, name)
      const text = fs
        .readFileSync(filePath)
        .toString()
        .replace(/\.less/g, '.css')
      fs.writeFileSync(filePath, text)
    })
}

function copyLess(lessPath) {
  const target = path.resolve(publish, 'lib/', lessPath)
  const originPath = path.resolve(root, lessPath)
  if (!fs.existsSync(path.dirname(target))) {
    fs.mkdirSync(path.dirname(target))
  }
  console.log(`cp -r ${originPath} ${target}`)
  execSync(`cp -r  ${originPath} ${target}`)
}

// 创建css 到style
glob('*/styles/', { cwd: path.join(process.cwd(), 'src') }, (error, files) => {
  files.forEach(p => {
    buildCss(p)
    replaceLess(p)
  })
})
buildCss('styles/')
replaceLess('styles/')

// 复制less 到lib
glob('**/*.less', { cwd: path.join(process.cwd(), 'src') }, (error, files) => {
  files.forEach(p => {
    copyLess(p)
  })
})
