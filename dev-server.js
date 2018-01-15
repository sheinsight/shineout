const request = require('request')
const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const swig = require('swig')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack/config.dev')
const config = require('./config')
const { version } = require('./package.json')

// webpack server ===========================================

new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  quiet: false,
  // noInfo: true,
  stats: {
    colors: true,
  },
}).listen(config.dev.webpackPort, 'localhost', (err) => {
  if (err) {
    return console.log(err)
  }
})

// dev server ================================================
const app = new Koa()
const router = new Router()

router.get('/', async (ctx) => {
  const template = swig.compileFile('./site/index.html')
  const prepath = config.dev.scriptPath.replace('**', version)
  const scripts = [
    ...(config.dev.scripts || []),
    ...Object.keys(config.webpack.entry).map(s => prepath.replace('*.*', `${s}.js`)),
  ]
  let css
  if (config.webpack.extractTextPluginPath) {
    css = prepath.replace('*.*', config.webpack.extractTextPluginPath)
  }
  ctx.body = template({ scripts, appName: config.appName, css })
})

// use devlopment version React
router.get('**/react.min.js', async (ctx) => {
  await send(ctx, 'node_modules/react/umd/react.development.js')
})
router.get('**/react-dom.min.js', async (ctx) => {
  await send(ctx, 'node_modules/react-dom/umd/react-dom.development.js')
})
router.get('**/prop-types.min.js', async (ctx) => {
  await send(ctx, 'node_modules/prop-types/prop-types.js')
})

// dev code proxy
router.get(config.dev.scriptPath, async (ctx) => {
  // console.log(ctx.url)
  let url = ctx.url.split('/')
  url = url[url.length - 1]
  const options = {
    uri: `http://localhost:${config.dev.webpackPort}/${url}`,
    mothed: 'GET',
  }
  ctx.body = request(options)
})

// react-hot-loader proxy
router.get('/*.hot-update.js(on)?', async (ctx) => {
  const options = {
    uri: `http://localhost:${config.dev.webpackPort}/${ctx.url}`,
    mothed: 'GET',
  }
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = request(options)
})

if (config.proxy) config.proxy(router)

app.use(router.routes())

app.listen(config.dev.publishPort, () => {
  const ps = config.dev.publishPort === 80 ? '' : `:${config.dev.publishPort}`
  console.log(`server running on http://localhost${ps}`)
})
