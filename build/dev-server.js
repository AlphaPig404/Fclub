require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')
var R = require('ramda')
var fs = require('fs')
var qs = require('qs')
var bodyParser = require('body-parser')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
//
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/carousel', function (req, res) {
//   axios.get('https://bangumi.bilibili.com/jsonp/slideshow/34.ver').then(_res => {
//     const data = _res.data
//     res.send(data)
//   }).catch(e => {
//     console.log(e)
//   })
// })

// app.get('/bilibili', function (req, res) {
//   const FROM = req.query.from
//   console.log(FROM)
//   axios.get('https://bangumi.bilibili.com/web_api/timeline_global').then(_res => {
//     const result = _res.data.result
    
//     if(FROM==='index'){
//       const COUNT = 6
//       let arr = []
//       for (var i = 6; arr.length < COUNT; i--) {
//         result[i].seasons.forEach(item => {
//           if (item.is_published == 1) {
//             arr.push(item)
//           }
//         })
//       }
//       res.send(arr.slice(0, 6))
//     }else{
//       res.send(result)
//     }
   
//   }).catch(e => {
//     console.log(e)
//   })
// })
// app.get('/base', function (req, res) {
//   var _res = res
//   var https = require('https');

//   var url = 'https://i0.hdslb.com/bfs/bangumi/320a6c9893a874e7db755ecb7316a0d0abccec49.jpg@160w_214h.webp'; //一张网络图片



//   https.get(url, function (res) {　　
//     var chunks = []; //用于保存网络请求不断加载传输的缓冲数据
//     　　
//     var size = 0;　　 //保存缓冲数据的总长度
//     res.on('data', function (chunk) {　　　　
//       chunks.push(chunk);　

//       size += chunk.length;　　 //累加缓冲数据的长度
//       　　
//     });
//   　　
//     res.on('end', function (err) {　　　　
//       var data = Buffer.concat(chunks, size);　　 //Buffer.concat将chunks数组中的缓冲数据拼接起来，返回一个新的Buffer对象赋值给data
// 　　
//       console.log(Buffer.isBuffer(data));　　　　 //可通过Buffer.isBuffer()方法判断变量是否为一个Buffer对象
//       　　　　
//       var base64Img = data.toString('base64');　　 //将Buffer对象转换为字符串并以base64编码格式显示

//       　　　　
//       console.log(base64Img);　　 //进入终端terminal,然后进入index.js所在的目录，

//       _res.send(base64Img)
//     });

//   });

// })

// app.post('/news',function(req,res){
//   const params = req.body
//   console.log(params)
//   axios.post('https://news.missevan.com/news/getIndex',qs.stringify(params)).then(_res=>{
//     res.send(_res.data)
//   }).catch(err=>{
//     console.log(err)
//   })
// })


// app.post('/manhua',function(req,res){
//   const params = req.body 
//   const postData = qs.stringify(params)
//   const options = {
//     headers:{
//       'Accept': 'application/json',
//       'Accept-Encoding': 'gzip, deflate',
//       'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
//       'Connection': 'keep-alive',
//       'Content-Length': postData.length,
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Cookie':'M_WEIBOCN_PARAMS=featurecode%3D20000180%26oid%3D4112833870205479%26luicode%3D20000061%26lfid%3D4112833870205479; USRMDBBS=usrmdinst_3; Hm_lvt_0f2ad750d24ff636f15d28fb499e6619=1507000344; Hm_lpvt_0f2ad750d24ff636f15d28fb499e6619=1507091094',
//       'Host':'manhua.weibo.cn',
//       'Origin':'http://manhua.weibo.cn',
//       'Referer':'http://manhua.weibo.cn/',
//       'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
//       'X-Requested-With':'XMLHttpRequest'
//     }
//   }

//   axios.post('http://manhua.weibo.cn/comic/home/ajax_index_recommend',postData,options).then(_res=>{
//     res.send(_res.data)
//   }).catch(err=>{
//     console.log(err)
//   })
// })

// app.post('/login',function(req,res){
//   const params = req.body
//   axios.post('http://localhost:3000/login',qs.stringify(params)).then(_res=>{
//     res.send(_res.data)
//   }).catch(err=>{
//     console.log(err)
//   })
// })


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
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
