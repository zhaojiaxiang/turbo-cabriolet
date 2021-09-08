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

export async function updateQaHeadSummary(id, data) {
  var resp = await request({
    url: '/qa/mcl_head_update_summary/' + id + '/',
    method: 'put',
    data
  })
  return resp
}

export async function getQaSlipNoCheckOutObject(slip_no) {
  var resp = await request({
    url: '/qa/qa_slip_no_checkout_object/?fslipno=' + slip_no,
    method: 'get'
  })
  return resp
}

export async function getQaDetailByQaHeadViaPagination(size, page, id) {
  var resp = await request({
    url: '/qa/mcl_detail/?page_size=' + size + '&page=' + page + '&qahf=' + id,
    method: 'get'
  })
  return resp
}

export async function deleteQaDetail(id) {
  var resp = await request({
    url: '/qa/mcl_detail/' + id + '/',
    method: 'delete'
  })
  return resp
}

export async function updateQaDetailResult(id, data) {
  var resp = await request({
    url: '/qa/mcl_detail_update_result/' + id + '/',
    method: 'put',
    data
  })
  return resp
}

export async function putDefaultOK(id) {
  var data = { 'qahf': id }
  var resp = await request({
    url: '/qa/default_ok/',
    method: 'put',
    data
  })
  return resp
}

export async function codeReviewInspection(object_id, slip_no) {
  var resp = await request({
    url: '/qa/codereview_inspection/?object_id=' + object_id + '&slip_no=' + slip_no,
    method: 'get'
  })
  return resp
}

export async function getMclTargetActual(id) {
  var resp = await request({
    url: '/qa/mcl_head_target_actual/' + id + '/',
    method: 'get'
  })
  return resp
}

export async function getQaHeadModifyDetail(id) {
  var resp = await request({
    url: '/qa/mcl_head_modify_detail/' + id + '/',
    method: 'get'
  })
  return resp
}

export async function updateQaHeadModifyDetail(id, data) {
  var resp = await request({
    url: '/qa/mcl_head_modify_detail/' + id + '/',
    method: 'put',
    data
  })
  return resp
}

export async function newQaDetail(data) {
  var resp = await request({
    url: '/qa/mcl_detail/',
    method: 'post',
    data
  })
  return resp;
}

export async function batchNewQaDetail(data) {
  var resp = await request({
    url: '/qa/batch_new_qa_detail/',
    method: 'post',
    data
  })
  return resp;
}

export async function updateQaDetail(id, data) {
  var resp = await request({
    url: '/qa/mcl_detail/' + id + '/',
    method: 'put',
    data
  })
  return resp;
}

export async function getQaDetail(id) {
  var resp = await request({
    url: '/qa/mcl_detail/' + id + '/',
    method: 'get'
  })
  return resp;
}

export async function fileUpload(data) {
  var resp = await request({
    url: '/qa/file_upload/',
    method: 'post',
    data
  })
  return resp;
}

export async function getQaDetailContentText(id) {
  var resp = await request({
    url: '/qa/mcl_detail_update_content_text/' + id + '/',
    method: 'get'
  })
  return resp;
}

export async function updateQaDetailContentText(id, data) {
  var resp = await request({
    url: '/qa/mcl_detail_update_content_text/' + id + '/',
    method: 'put',
    data
  })
  return resp;
}

export async function approvalQaDetailContentText(id, data) {
  var resp = await request({
    url: '/qa/mcl_detail_approval_content_text/' + id + '/',
    method: 'put',
    data
  })
  return resp;
}

export async function getQadetailProofContentText(qadf_id) {
  var resp = await request({
    url: '/qa/mcl_detail_proof_content_text/?qadf=' + qadf_id,
    method: 'get'
  })
  return resp;
}

export async function getDesignReview(slipno, objectid) {
  var resp = await request({
    url: '/review/qa/design_review/?fslipno=' + slipno + '&fobjectid=' + objectid,
    method: 'get'
  })
  return resp;
}

export async function newDesignReview(data) {
  var resp = await request({
    url: '/review/qa/design_review/',
    method: 'post',
    data
  })
  return resp;
}

export async function updateDesignReview(id, data) {
  var resp = await request({
    url: '/review/qa/design_review/' + id + '/',
    method: 'put',
    data
  })
  return resp;
}

export async function getCodeReview(slipno, objectid) {
  var resp = await request({
    url: '/review/qa/code_review/?fslipno=' + slipno + '&fobjectid=' + objectid,
    method: 'get'
  })
  return resp;
}

export async function newCodeReview(data) {
  var resp = await request({
    url: '/review/qa/code_review/',
    method: 'post',
    data
  })
  return resp;
}

export async function updateCodeReview(id, data) {
  var resp = await request({
    url: '/review/qa/code_review/' + id + '/',
    method: 'put',
    data
  })
  return resp;
}
