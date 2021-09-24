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

export async function liaisonTypeScale() {
  var resp = await request({
    url: '/dashboard/liaison_type_scale/',
    method: 'get'
  })
  return resp
}

export async function liaisonPlanActual() {
  var resp = await request({
    url: '/dashboard/liaison_plan_actual/',
    method: 'get'
  })
  return resp
}

export async function liaisonTypePowerScale() {
  var resp = await request({
    url: '/dashboard/liaison_type_power_scale/',
    method: 'get'
  })
  return resp
}

export async function dashboardPanelGroup() {
  var resp = await request({
    url: '/dashboard/dashboard_panel_group/',
    method: 'get'
  })
  return resp
}

export async function projectBugRate() {
  var resp = await request({
    url: '/dashboard/project_bug_rate/',
    method: 'get'
  })
  return resp
}
