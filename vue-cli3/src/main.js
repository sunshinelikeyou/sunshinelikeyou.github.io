/*
 * @Description: 
 * @Author: theman
 * @Date: 2019-06-10 20:34:46
 * @LastEditTime: 2019-06-12 23:01:37
 * @LastEditors: theman
 */
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import uuid from 'uuid'
// import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$uuid = uuid

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
