// 引入request.js
import request from './request'
// 登录接口
export function login (data) {
  return request({
    url: 'login',
    method: 'post',
    data: data
  })
}
// 用户列表接口
export function getUser (params) {
  return request({
    url: 'users',
    method: 'post',
    params
  })
}

// this.$http({
//     method: 'get',
//     url: '/users',
//     params: this.pageinfo
//   }).then(res => {
//     console.log('res:', res)
//     // 解构取值
//     if (res.data && res.data.data) {
//       var {
//         data: { pagenum, total, users },
//         meta: { msg, status }
//       } = res.data
//     } else {
//       var {
//         meta: { msg, status }
//       } = res.data
//     }
//     if (status === 200) {
//       this.tableData = users
//       this.pageinfo.pagenum = pagenum
//       this.total = total
//       this.$message({
//         message: msg,
//         type: 'success'
//       })
//     } else {
//       this.$message({
//         message: msg,
//         type: 'error'
//       })
//     }
//   })