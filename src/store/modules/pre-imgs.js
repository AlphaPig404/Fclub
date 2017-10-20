import * as types from '../mutation-types'

const state ={
  show_pre: false,
  imgs: [],
  page_index: -1
}

const getters = {
  getPreShowState: state => state.show_pre,
  getPreShowImgs: state => state.imgs,
  getPageIndex: state => state.page_index
}

const actions = {
  selectImg({commit,state},{imgs,flag,page_index}){
    commit(types.SHOW_PRE,flag)
    commit(types.SET_PRE_IMGS,imgs)
    commit(types.SET_PAGE_INDEX,page_index)
  },
  hidePre({commit,state}){
    commit(types.SHOW_PRE,false)
    commit(types.SET_PAGE_INDEX,-1)
    commit(types.SET_PRE_IMGS,[])
  }
}

const mutations = {
  [types.SHOW_PRE](state,flag){
    state.show_pre = flag
  },
  [types.SET_PRE_IMGS](state,imgs){
    state.imgs = imgs
  },
  [types.SET_PAGE_INDEX](state,index){
    state.page_index = index
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}