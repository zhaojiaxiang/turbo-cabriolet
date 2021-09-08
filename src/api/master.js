import request from '@/utils/request';

export async function getSystemMaster() {
  var resp = await request({
    url: '/master/systems/',
    method: 'get'
  });
  return resp;
}

export async function newSystemMaster(data) {
  var resp = await request({
    url: '/master/systems/',
    method: 'post',
    data
  });
  return resp;
}

export async function deleteSystemMaster(id) {
  var resp = await request({
    url: '/master/systems/' + id + '/',
    method: 'delete'
  });
  return resp;
}

export async function newProjectMaster(data) {
  var resp = await request({
    url: '/master/projects/',
    method: 'post',
    data
  })
  return resp;
}

export async function deleteProjectMaster(id) {
  var resp = await request({
    url: '/master/projects/' + id + '/',
    method: 'delete'
  })
  return resp;
}
