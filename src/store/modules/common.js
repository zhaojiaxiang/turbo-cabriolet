import { getProjects, getSystems, getGroupUsers, getAllUsers } from '@/api/common';
import { handleAllUser } from '@/utils/common';

const state = {
  systems: {},
  projects: {},
  group_users: {},
  all_group_users: []
}

const mutations = {
  SET_SYSTEMS(state, systems) {
    state.systems = systems
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_GROUP_USERS(state, group_users) {
    state.group_users = group_users
  },
  SET_ALL_GROUP_USERS(state, all_users) {
    state.all_group_users = all_users
  }
}

const actions = {
  getProjects({ commit }) {
    return new Promise((resolve, reject) => {
      getProjects().then(response => {
        const { data } = response
        commit('SET_PROJECTS', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSystems({ commit }) {
    return new Promise((resolve, reject) => {
      getSystems().then(response => {
        const { data } = response
        commit('SET_SYSTEMS', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGroupUsers({ commit }) {
    return new Promise((resolve, reject) => {
      getGroupUsers().then(response => {
        const { data } = response
        commit('SET_GROUP_USERS', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllGroupUsers({ commit }) {
    return new Promise((resolve, reject) => {
      getAllUsers().then(response => {
        const { data } = response
        commit('SET_ALL_GROUP_USERS', handleAllUser(data))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  mutations,
  state,
  actions
}
