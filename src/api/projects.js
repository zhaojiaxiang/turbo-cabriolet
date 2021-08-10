import request from '@/utils/request'

export async function getProjectMclList(order_no) {
  var resp = await request({
    url: '/liaison/qa_project_detail_view/?order_no=' + order_no,
    method: 'get'
  })
  return resp
}
