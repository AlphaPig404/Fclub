// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/article': {
        target: 'https://www.toutiao.com/c/user',
        pathRewrite: {
          '^/article': '/article'
        }
      },
      '/vote': {
        target: 'http://dev.act.cp8531.cn/',
        pathRewrite: {
          '^/vote': '/vote'
        }
      },
      '/signin': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/signin': '/signin'
        }
      },
      '/signup': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/signup': '/signup'
        }
      },
      '/user_info': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/user_info': '/user_info'
        }
      },
      '/test': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/test': '/test'
        }
      },
      '/qiniu_token': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/qiniu_token': '/qiniu_token'
        }
      },
      '/post': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/post': '/post'
        }
      },
      '/carousel': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/carousel': '/carousel'
        }
      },
      '/bilibili': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/bilibili': '/bilibili'
        }
      },
      '/news': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/news': '/news'
        }
      },
      '/manhua': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/manhua': '/manhua'
        }
      },
      '/check_login': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/check_login': '/check_login'
        }
      },
      '/comment': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/comment': '/comment'
        }
      },
      '/like': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/like': '/like'
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
