import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Data from './components/Data.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
   {
      path: '/',
      name: 'login',
      component: Login
    },
   {
      path: '/data',
      name: 'data',
      component: Data
    } 
  ]
})
