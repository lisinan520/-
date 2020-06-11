import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 登录
import login from '../views/login/index'
//
import userList from '../views/userList/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { // 路由的数据
      Authorition: true
    },
    children: [
      {
        path: '',
        component: userList
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
