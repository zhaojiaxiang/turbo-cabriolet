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

export async function getSingleALlLiaisonBySlipNo(slipno) {
  var resp = await request({
    url: '/liaison/all_liaisons/?fslipno' + slipno,
    method: 'get'
  })
  return resp;
}

export async function getLiaisonsViaParam(system, project, slip, type, status, order, leader, helper, assigned, sirno) {
  var resp = await request({
    url: '/liaison/all_liaisons/?fsystemcd=' + system + '&fprojectcd=' + project + '&fslipno=' + slip + '&ftype=' +
    type + '&fstatus=' + status + '&fodrno=' + order + '&fleader=' + leader + '&fhelper=' + helper + '&fassignedto=' + assigned + '&fsirno=' + sirno,
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

export async function getMyMCL() {
  var resp = await request({
    url: '/account/mine_task_mcl/',
    method: 'get'
  })
  return resp
}

export async function getMyPCL() {
  var resp = await request({
    url: '/account/mine_task_pcl/',
    method: 'get'
  })
  return resp
}

export async function getMyApproval() {
  var resp = await request({
    url: '/account/mine_task_approval/',
    method: 'get'
  })
  return resp
}

export async function getMyConfirm() {
  var resp = await request({
    url: '/account/mine_task_conform/',
    method: 'get'
  })
  return resp
}

export async function getMyRelease() {
  var resp = await request({
    url: '/account/mine_task_release/',
    method: 'get'
  })
  return resp
}
