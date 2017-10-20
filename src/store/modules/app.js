import * as types from '../mutation-types'

const state ={
  transition_name: ''
}

const getters = {
  getTransitionName: state => state.transition_name
}

const actions = {
  
}

const mutations = {
  [types.SET_TRANSITION_NAME](state,name){
    state.transition_name = name
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}