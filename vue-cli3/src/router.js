/*
 * @Description: 
 * @Author: theman
 * @Date: 2019-06-10 20:34:46
 * @LastEditTime: 2019-06-12 21:13:13
 * @LastEditors: theman
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ToDoList.vue')
    }
  ]
})
