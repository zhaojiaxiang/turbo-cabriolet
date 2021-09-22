import request from '@/utils/request'

export async function dashboardLiaisons(user) {
  var resp = await request({
    url: '/dashboard/liaisons/?name=' + user,
    method: 'get'
  })
  return resp
}

export async function dashboardGroupLiaisons(organization) {
  var resp = await request({
    url: '/dashboard/group_liaisons/?organization=' + organization,
    method: 'get'
  })
  return resp
}

export async function dashboardProjectTestDetail(orderNo) {
  var resp = await request({
    url: '/dashboard/project_test_detail/?orderno=' + orderNo,
    method: 'get'
  })
  return resp
}
