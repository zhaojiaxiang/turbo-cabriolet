import request from '@/utils/request'

export async function dashboardLiaisons(user) {
  var resp = await request({
    url: '/dashboard/liaisons/??name=' + user,
    method: 'get'
  })
  return resp
}
