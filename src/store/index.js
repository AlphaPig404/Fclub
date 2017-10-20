import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import preImgs from './modules/pre-imgs'
import editor from './modules/editor'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules:{
    app,
    preImgs,
    editor
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})