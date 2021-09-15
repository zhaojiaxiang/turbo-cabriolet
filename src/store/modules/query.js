import { getQaProjectGroup } from '@/api/query';
import store from '..'

const state = {
  query_project_list: [],
  query_project_current_page: 1,
  query_project_page_size: 6,
  query_project_page_count: 1,
  query_project_count: 0,
  query_project_organization_id: '',
  query_project_project_code: '',
  query_project_order_no: ''
}

const mutations = {
  SET_QUERY_PROJECT(state, data) {
    state.query_project_list = data
  },
  SET_QUERY_PROJECT_CURRENT_PAGE(state, current_page) {
    state.query_project_current_page = current_page
  },
  SET_QUERY_PROJECT_PAGE_SIZE(state, page_size) {
    state.query_project_page_size = page_size
  },
  SET_QUERY_PROJECT_PAGE_COUNT(state, page_count) {
    state.query_project_page_count = page_count
  },
  SET_QUERY_PROJECT_COUNT(state, count) {
    state.query_project_count = count
  },
  SET_QUERY_PROJECT_PROJECT_CODE(state, project_code) {
    state.query_project_project_code = project_code
  },
  SET_QUERY_PROJECT_ORGANIZATION(state, organization_id) {
    state.query_project_organization_id = organization_id
  },
  SET_QUERY_PROJECT_ORDER_NO(state, order_no) {
    state.query_project_order_no = order_no
  }
}

const actions = {
  refreshQueryProjectItemGroup({ commit }, args) {
    var organization = store.getters.query_project_organization_id
    var project = store.getters.query_project_project_code
    var order = store.getters.query_project_order_no
    var page = store.getters.query_project_current_page
    var page_size = store.getters.query_project_page_size
    return new Promise((resolve, reject) => {
      getQaProjectGroup(organization, project, order, page, page_size).then(response => {
        const { data } = response
        const { results, count, pages } = data
        commit('SET_QUERY_PROJECT', results)
        commit('SET_QUERY_PROJECT_COUNT', count)
        commit('SET_QUERY_PROJECT_PAGE_COUNT', pages)
        resolve(response)
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
