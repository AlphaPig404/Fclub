// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import store from './store'

require('swiper/dist/css/swiper.css')

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.bus = new Vue()
Vue.prototype.$global = {}

router.beforeEach((to,from,next)=>{
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length

  const transition_name = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  // store.commit('SET_TRANSITION_NAME',transition_name)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
