import request from '@/utils/request';

export async function getProjectDetailView(order_no) {
  var resp = await request({
    url: '/liaison/qa_project_detail_view/?order_no=' + order_no,
    method: 'get'
  })
  return resp;
}

export async function getQaProjectGroup(organization_id, project_code, order_no, page, page_size) {
  var resp = await request({
    url: '/liaison/qa_project_group/?forganization=' + organization_id + '&fprojectcd=' + project_code + '&fodrno=' + order_no + '&page=' + page + '&page_size=' + page_size,
    method: 'get'
  })
  return resp;
}

export async function getReportList(order_no) {
  var resp = await request({
    url: '/report/list/?fodrno=' + order_no,
    method: 'get'
  })
  return resp;
}

export async function getReportPCLList(order_no) {
  var resp = await request({
    url: '/report/list_pcl/?fodrno=' + order_no,
    method: 'get'
  })
  return resp;
}

export async function getReportLiaisonInfo(slip_no) {
  var resp = await request({
    url: '/report/liaison_info/?slip_no=' + slip_no,
    method: 'get'
  })
  return resp;
}

export async function getReportQaInfo(slip_no, image) {
  var resp = await request({
    url: '/report/qa_info/?slip_no=' + slip_no + '&image=' + image,
    method: 'get'
  })
  return resp;
}

export async function getReportOrderInfo(order_no, multiple_slip, image) {
  var resp = await request({
    url: '/report/order_info/?order_no=' + order_no + '&multiple_slip=' + multiple_slip + '&image=' + image,
    method: 'get'
  })
  return resp;
}
