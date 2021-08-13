import request from '@/utils/request'

// other API
export async function getMyTaskBar() {
  var resp = await request({
    url: '/account/mine_task_bar/',
    method: 'get'
  })
  return resp
}

export async function myProjectItems() {
  var resp = await request({
    url: '/account/mine_order_info/',
    method: 'get'
  })
  return resp
}

// liaison API

export async function getLiaisonsViaPagination(page, size) {
  var resp = await request({
    url: '/liaison/liaisons/?page=' + page + '&page_size=' + size,
    method: 'get'
  })
  return resp
}

export async function updateLiaisonStatus(id, data) {
  var resp = await request({
    url: '/liaison/liaison_update_status/' + id + '/',
    method: 'put',
    data
  })
  return resp
}

export async function deleteLiaison(id) {
  var resp = await request({
    url: '/liaison/liaisons/' + id + '/',
    method: 'delete'
  })
  return resp
}

export async function getSingleLiaison(id) {
  var resp = await request({
    url: '/liaison/liaisons/' + id + '/',
    method: 'get'
  })
  return resp
}

export async function newLiaison(data) {
  var resp = await request({
    url: '/liaison/liaisons/',
    method: 'post',
    data
  })
  return resp
}

export async function syncLiaisonBySirNo(sir_no) {
  var resp = await request({
    url: '/liaison/sync_sir/?sync_sirno=' + sir_no,
    method: 'get'
  })
  return resp
}

export async function modifyLiaison(id, data) {
  var resp = await request({
    url: '/liaison/liaisons/' + id + '/',
    method: 'put',
    data
  })
  return resp
}

export async function liaisonFileUpdate(data) {
  var resp = await request({
    url: '/liaison/liaison_file_upload/',
    method: 'post',
    data
  })
  return resp
}

export async function getProjectMclDataStatistics(order_no) {
  var resp = await request({
    url: '/liaison/qa_test_statistics/?fodrno=' + order_no,
    method: 'get'
  })
  return resp
}

export async function getSingleLiaisonBySlipNo(slip_no) {
  var resp = await request({
    url: '/liaison/liaisons/?fslipno=' + slip_no
  })
  return resp
}

