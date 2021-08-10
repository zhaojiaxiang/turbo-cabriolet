import request from '@/utils/request'

export async function getCheckoutList(applicant, status) {
  var resp = await request({
    url: '/checkout/pb_file_checkout/?page_size=1000&fapplicant=' + applicant + '&fchkstatus=' + status,
    method: 'get'
  })
  return resp
}

export async function getAddressList() {
  var resp = await request({
    url: '/account/user_list/',
    method: 'get'
  })
  return resp
}

export async function getCheckOutListViaPagination(page, size, system, status, applicant, object, slipNo) {
  var resp = await request({
    url: '/checkout/pb_file_checkout/?page=' + page + '&page_size=' + size + '&fsystem=' + system + '&fslipno=' + slipNo + '&fchkoutobj=' + object + '&fchkstatus=' + status + '&fapplicant=' + applicant,
    method: 'get'
  })
  return resp
}

export async function deleteCheckoutData(id) {
  var resp = await request({
    url: '/checkout/pb_file_checkout/' + id + '/',
    method: 'delete'
  })
  return resp
}

export async function updateCheckoutData(id, checkOutInfo) {
  var resp = await request({
    url: '/checkout/pb_file_checkout/' + id + '/',
    method: 'put',
    data: checkOutInfo
  })
  return resp
}

export async function newCheckoutData(checkOutInfo) {
  var resp = await request({
    url: '/checkout/pb_file_checkout/',
    method: 'post',
    data: checkOutInfo
  })
  return resp
}

export async function getCheckoutData(id) {
  var resp = await request({
    url: '/checkout/pb_file_checkout/' + id + '/',
    method: 'get'
  })
  return resp
}

export async function sendMail(data) {
  var resp = request({
    url: '/checkout/send_email/',
    method: 'post',
    data
  })
  return resp
}
