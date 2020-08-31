import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseNavState:true,
    baseHeaderState: true,
    userInfo:{phone:'13477777777'},
    editorArticle:{
      title: '',
      author: '',
      intro: '',
      content: '',
      time: '',
      id:''
    }
  },
  mutations: {
    baseNav(state,payload){
      state.baseNavState = payload
    },
    baseHeader(state,payload){
      state.baseHeaderState = payload
    },
    userInfo(state, payload) {
      state.userInfo = payload
    },
    editorArticle(state, payload){
      console.log(payload)
      state.editorArticle = payload
    }
  },
  actions: {
    baseBG(context,payload){
      context.commit('baseNav',payload)
      context.commit('baseHeader',payload)
    }
    
  },
  modules: {
  }
})
