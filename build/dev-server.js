require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var app = express()
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

const bodyParser = require('body-parser')
// const session = require('cookie-session')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(session({name: 'armoredOverride', secret: 'This is a great big secret!'}))
// console.log(rhandle)


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = false // !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// var app = express()
var compiler = webpack(webpackConfig)
app.root = __dirname
app.get('*', function(req, res, next) {
  console.log(req.url)
  // console.log(app.root)
  next()
})

app.use('/node_modules', express.static(app.root + '/../node_modules'))

app.get('/favicon.ico', function(req, res, next) {
})

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// app.get('*', function(req, res, next) {
//   // console.log('2: ', req.url)
//   // console.log(app.root)
//   next()
// })

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// app.get('*', function(req, res, next) {
//   // console.log('3:', req.url)
//   // console.log(app.root)
//   next()
// })
// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

var uri = 'http://localhost:' + port
// console.log('Port: ', port)
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

// console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
