import * as types from '../mutation-types'

const state ={
  show_editor: false,
  editor_msg: {},
  editor_title: '',
  editor_type: ''
}

const getters = {
  getEditorShowState: state => state.show_editor,
  getEditorMsg: state => state.editor_msg,
  getEditorTitle: state => state.editor_title,
  getEditorType: state => state.editor_type
}

const actions = {
  showEditor({commit,state},{title,type,msg}){
    commit(types.SHOW_EDITOR,true)
    commit(types.SET_EDITOR_TITLE,title)
    commit(types.SET_EDITOR_TYPE,type)
    commit(types.SET_EDITOR_MSG,msg)
  },
  cancelEditor({commit,state}){
    commit(types.SHOW_EDITOR,false)
  }
}

const mutations = {
  [types.SHOW_EDITOR](state,flag){
    state.show_editor = flag
  },
  [types.SET_EDITOR_TITLE](state,title){
    state.editor_title = title
  },
  [types.SET_EDITOR_TYPE](state,type){
    state.editor_type = type
  },
  [types.SET_EDITOR_MSG](state,msg){
    state.editor_msg = msg
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}