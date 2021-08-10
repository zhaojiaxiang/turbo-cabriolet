import request from '@/utils/request'

export async function login(data) {
  var resp = await request({
    url: '/login/',
    method: 'post',
    data
  })
  return resp
}

export function getInfo(id) {
  return request({
    url: '/account/user_list/' + id + '/',
    method: 'get'
  })
}

export async function updateEmailDays(email_days) {
  var data = {
    'email_days': email_days
  }
  var resp = await request({
    url: '/account/update_email_days/',
    method: 'post',
    data
  })
  return resp
}

export async function updateUserPassword(data) {
  var resp = await request({
    url: '/account/update_password/',
    method: 'post',
    data
  })
  return resp
}
