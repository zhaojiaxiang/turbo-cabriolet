import request from '@/utils/request'

export async function getQaHead(id) {
  var resp = await request({
    url: '/qa/mcl_head/' + id + '/',
    method: 'get'
  })
  return resp
}

export async function newQaHead(data) {
  var resp = await request({
    url: '/qa/mcl_head/',
    method: 'post',
    data
  })
  return resp
}

export async function getQaHeadBySlipNo(slip_no) {
  var resp = await request({
    url: '/qa/mcl_head/?fslipno=' + slip_no,
    method: 'get'
  })
  return resp
}

export async function deleteQaHead(id) {
  var resp = await request({
    url: '/qa/mcl_head/' + id + '/',
    method: 'delete'
  })
  return resp
}

export async function updateQaHead(id, data) {
  var resp = await request({
    url: '/qa/mcl_head/' + id + '/',
    method: 'put',
    data
  })
  return resp
}
