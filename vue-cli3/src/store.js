/*
 * @Description: 
 * @Author: theman
 * @Date: 2019-06-10 20:34:46
 * @LastEditTime: 2019-06-12 23:40:12
 * @LastEditors: theman
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters:{
     
  },
  mutations: {
    // 获取数据
      getTodos(state,payload){
          state.todos = payload;
      },
      // 删除点击 todo
      deleteTodo(state,index){
          state.todos.splice(index,1)
      }
  },
  actions: {
      getTodos(context,payload){
          context.commit('getTodos',payload)
      }
  }
})
