import request from '@/utils/request'

export async function getProjects() {
  var resp = await request({
    url: '/master/projects/',
    method: 'get'
  })
  return resp
}

export async function getSystems() {
  var resp = await request({
    url: '/master/systems/',
    method: 'get'
  })
  return resp
}

export async function getGroupUsers() {
  var resp = await request({
    url: '/account/group_users/',
    method: 'get'
  })
  return resp
}

export async function getOrganizationUsers(organization) {
  var resp = await request({
    url: '/rbac/persons_in_organization/?organization=' + organization,
    method: 'get'
  })
  return resp
}

export async function getOrganization(organization) {
  var resp = await request({
    url: '/rbac/organization/' + organization + '/',
    method: 'get'
  })
  return resp
}

export async function getAllUsers() {
  var resp = await request({
    url: '/account/user_list/',
    method: 'get'
  })
  return resp
}

export async function getWorkingOrganization() {
  var resp = await request({
    url: '/rbac/working_organization/',
    method: 'get'
  })
  return resp
}

export async function getWorkingProject(organization) {
  var resp = await request({
    url: '/rbac/working_project/?organization=' + organization,
    method: 'get'
  })
  return resp
}
