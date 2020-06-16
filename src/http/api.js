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
// console.log('1111', params)
  return request({
    url: 'users',
    method: 'get',
    params
  })
}

// 修改用户状态接口
export function modifyUserStaus (user) {
  console.log('11222211', user)
  return request({
    url: `users/${user.id}/state/${user.mg_state}`,
    method: 'put'
  })
}

// 编辑用户信息接口
export function editUserInfo (userid, data) {
//   console.log('11222211', user)
  return request({
    url: `users/${userid}`,
    method: 'put',
    data
  })
}

// 添加用户信息接口
export function addUsers (data) {
  //   console.log('11222211', user)
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

//  删除单个用户
export function del (userid) {
  return request({
    url: `users/${userid}`,
    method: 'delete'
  })
}
