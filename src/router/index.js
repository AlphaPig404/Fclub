import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/components/index/layout'], resolve)
const message = resolve => require(['@/components/message/layout'], resolve)
const detail = resolve => require(['@/components/detail/layout'], resolve)
const search = resolve => require(['@/components/search/layout'], resolve)

const posts = resolve => require(['@/components/post/layout'], resolve)
const postItem = resolve => require(['@/components/post/post_item/layout'], resolve)

const otaku = resolve => require(['@/components/index/otaku/layout'], resolve)
const news = resolve => require(['@/components/index/news/layout'], resolve)
const timeline = resolve => require(['@/components/index/timeline/layout'], resolve)
const year = resolve => require(['@/components/index/year/layout'], resolve)
const manhua = resolve => require(['@/components/index/manhua/layout'], resolve)
const myIframe = resolve => require(['@/components/index/my-iframe'], resolve)

const user = resolve => require(['@/components/user/layout'], resolve)
const signin = resolve => require(['@/components/user/signin/layout'], resolve)
const signup = resolve => require(['@/components/user/signup/layout'], resolve)
const forgot = resolve => require(['@/components/user/forgot/layout'], resolve)
const userInfo = resolve => require(['@/components/user/user_info/layout'], resolve)

const me = resolve => require(['@/components/me/layout'], resolve)
const about = resolve => require(['@/components/me/about/layout'], resolve)
const favor = resolve => require(['@/components/me/favor/layout'], resolve)
const myposts = resolve => require(['@/components/me/myposts/layout'], resolve)

Router.prototype.go = function () {
 this.isBack = true
 window.history.go(-1)
}

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '追番',
        keepAlive: true
      },
      children:[
        {
          path: 'otaku',
          component: otaku,
          meta: {
            title: '宅文化基地',
            return: true
          }
        },
        {
          path: 'year',
          component: year,
          meta: {
            title: '年度新番',
            return: true
          }
        },
        {
          path: 'timeline',
          component: timeline,
          meta: {
            title: '每日放送',
            return: true
          }
        },
        {
          path: 'news',
          component: news,
          meta: {
            title: '最新资讯',
            return: true
          }
        },
        {
          path: 'manhua',
          component: manhua,
          meta: {
            title: '新浪漫画',
            return: true
          }
        },
        {
          path: 'third',
          component: myIframe,
          meta: {
            title: '详情',
            return: true
          }
        }
      ]
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        title: '消息',
        keepAlive: true
      },
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
    },
    {
      path: '/posts',
      name: 'posts',
      component: posts,
      children: [
        {
          path: 'item',
          name:'post-item',
          component: postItem,
          meta:{
            title: '微帖正文',
            return: true
          }
        }
      ],
      meta: {
        title: '微帖'
      },
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      redirect: 'me/myposts',
      children:[
        {
          path: 'about',
          component: about,
          meta: {
            title: '我的'
          }
        },
        {
          path: 'myposts',
          component: myposts,
          meta: {
            title: '我的'
          }
        },
        {
          path: 'favor',
          component: favor,
          meta: {
            title: '我的'
          }
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: 'user/signin',
      children:[
        {
          path: 'signin',
          component: signin,
          meta: {
            title: '登录',
            return: true
          }
        },
        {
          path: 'forgot',
          component: forgot,
          meta: {
            title: '忘记密码',
            return: true
          }
        },
        {
          path: 'signup',
          component: signup,
          meta: {
            title: '注册',
            return: true
          }
        },
        {
          path: 'info',
          component: userInfo,
          meta: {
            title: '我的资料',
            return: true,
            confirm: false
          }
        },
      ]
    },
  ]
})
