import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from './store'
// 引用reset.css
import '@/assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = Axios
// url
Axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'
// 创建一个日期全局过滤器
Vue.filter('date', function () {
  return moment().format('YYYY-MM-DD')
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('to', to)
  const token = localStorage.getItem('token')
  if (to.meta.Authorition) {
    if (token) {
      next()
    } else {
      router.push({ name: 'login' })
    }
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
