const request = require('request')
const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const multer = require('koa-multer')
const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack/config.dev')
const config = require('./config')
const { version } = require('./package.json')
const ejs = require('./scripts/ejs')

require('./scripts/dev-site')

// webpack server ===========================================

new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  quiet: false,
  // noInfo: true,
  stats: {
    colors: true,
    // children: false,
  },
}).listen(config.dev.webpackPort, 'localhost', err => {
  if (err) {
    console.log(err)
  }
})

// dev server ================================================
const app = new Koa()
const router = new Router()

// use devlopment version React
router.get('**/react.production.min.js', async ctx => {
  await send(ctx, 'node_modules/react/umd/react.development.js')
})
router.get('**/react-dom.production.min.js', async ctx => {
  await send(ctx, 'node_modules/react-dom/umd/react-dom.development.js')
})
router.get('**/jszip.min.js', async ctx => {
  await send(ctx, 'node_modules/jszip/dist/jszip.min.js')
})

router.get('**/docsearch.css', async ctx => {
  await send(ctx, 'node_modules/docsearch.js/dist/cdn/docsearch.min.css')
})

router.get('**/versions.json', async ctx => {
  await send(ctx, 'site/versions.json')
})

router.get('/images/*', async ctx => {
  await send(ctx, `site/${ctx.path}`)
})

const upload = multer({})
router.post('/upload/', upload.single('file'), async ctx => {
  fs.writeFileSync(ctx.req.file.originalname, ctx.req.file.buffer)
  ctx.body = {
    success: true,
    model: {
      id: Date.now().toString(),
      name: ctx.req.file.originalname,
    },
  }
})

router.post('/upload-test', upload.single('file'), async ctx => {
  await new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, 1000)
  )
  ctx.body = {
    success: true,
    model: {
      id: Date.now().toString(),
      name: ctx.req.file.originalname,
    },
  }
})

// dev code proxy
router.get(config.dev.scriptPath, async (ctx, next) => {
  // console.log(ctx.url)
  let url = ctx.url.split('/')
  url = url[url.length - 1]
  if (url.endsWith('.Form') || url.endsWith('.List')) {
    await next()
  } else {
    const options = {
      uri: `http://localhost:${config.dev.webpackPort}/${url}`,
      method: 'GET',
    }
    ctx.body = request(options)
  }
})

// react-hot-loader proxy
router.get('/*.hot-update.js(on)?', async ctx => {
  const options = {
    uri: `http://localhost:${config.dev.webpackPort}/${ctx.url}`,
    method: 'GET',
  }
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = request(options)
})

router.get('/*', async ctx => {
  if (ctx.url === '/') ctx.redirect('/cn/index/')
  const reactVersion = ctx.query.v
  if (reactVersion) {
    ctx.body = await ejs.renderFile('./site/index-v.html', { version: reactVersion })
    return
  }
  const prepath = config.dev.scriptPath.replace('**', version)
  const scripts = [
    ...(config.dev.scripts || []),
    ...Object.keys(config.webpack.entry).map(s => prepath.replace('*.*', `${s}.js`)),
    '__css_hot_loader.js',
  ]
  const styles = config.dev.styles || []
  ctx.type = 'text/html; charest=utf-8'
  ctx.body = await ejs.renderFile(`./site/index.html`, {
    scripts,
    env: 'development',
    appName: config.appName,
    styles,
    description: '',
  })
})

if (config.proxy) config.proxy(router)

app.use(router.routes())

app.listen(config.dev.publishPort, () => {
  const ps = config.dev.publishPort === 80 ? '' : `:${config.dev.publishPort}`
  console.log(`server running on http://localhost${ps}`)
})
