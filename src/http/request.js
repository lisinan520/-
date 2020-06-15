//  axios请求和响应拦截
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // 默认基本地址
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1',
  timeout: 3000 // 请求延迟时间
})
// 请求拦截
service.interceptors.request.use(function (config) {
  // 成功处理 例如：存token
  if (config.url !== 'login') {
    const token = localStorage.getItem('token')
    //   配置头信息
    config.headers.Authorization = token
  }

  return config
}, function (error) {
  // 报错返回
  return Promise.reject(error)
})
// 响应拦截
service.interceptors.response.use(function (response) {
  //   解构赋值
  if (response.data.data && response.data.meta) {
    var { data: res, meta: { msg, status } } = response.data
    // 拿到token
    var { token } = res
    if (status === 400) {
      Message({
        message: '登录失败',
        type: 'error'
      })
      Promise.reject(msg)
    }
    if (status === 200) {
      // 存token
      token && localStorage.setItem('token', token)
      // 跳转到首页
      // this.$router.push('/home')
      //   登陆成功的提示
      Message({
        message: msg,
        type: 'success'
      })
      return {
        flag: 2, // 自定义
        msg: msg,
        result: res
      }
      //
    }
  } else {
    Message({
      message: '参数有误请检查',
      type: 'error'
    })
    return {
      msg: '参数有误请检查',
      flag: 1
    }
  }
}, function (error) {
//   return Promise.reject(error)
  Message({
    message: '请求有误请检查',
    type: 'error'
  })
})

export default service
