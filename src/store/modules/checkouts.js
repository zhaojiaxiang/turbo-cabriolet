import { getCheckOutListViaPagination, deleteCheckoutData, updateCheckoutData, newCheckoutData, getCheckoutData } from '@/api/checkouts';
import store from '..';

const state = {
  checkout_table: [],
  checkout_current_page: 1,
  checkout_page_size: 15,
  checkout_page_count: 1,
  checkout_count: 0
}

const mutations = {
  SET_CHECKOUT_TABLE(state, checkout_table) {
    state.checkout_table = checkout_table
  },
  SET_CHECKOUT_CURRENT_PAGE(state, current_page) {
    state.checkout_current_page = current_page
  },
  SET_CHECKOUT_PAGE_SIZE(state, page_size) {
    state.checkout_page_size = page_size
  },
  SET_CHECKOUT_PAGE_COUNT(state, page_count) {
    state.checkout_page_count = page_count
  },
  SET_CHECKOUT_COUNT(state, count) {
    state.checkout_count = count
  }
}

const actions = {
  getCheckOutListViaPagination({ commit, state }, args) {
    const { system, status, applicant, object, slip_no } = args
    return new Promise((resolve, reject) => {
      getCheckOutListViaPagination(state.checkout_current_page, state.checkout_page_size, system, status, applicant, object, slip_no).then(response => {
        const { data } = response
        const { count, pages, results } = data
        commit('SET_CHECKOUT_COUNT', count)
        commit('SET_CHECKOUT_PAGE_COUNT', pages)
        commit('SET_CHECKOUT_TABLE', results)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCheckoutData({ commit }, id) {
    return new Promise((resolve, reject) => {
      getCheckoutData(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteCheckoutData({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteCheckoutData(id).then(response => {
        var args = { 'system': '', 'status': '', 'applicant': store.getters.name, 'object': '', 'slip_no': '' }
        store.dispatch('checkouts/getCheckOutListViaPagination', args)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateCheckoutData({ commit }, args) {
    const { id, data } = args
    return new Promise((resolve, reject) => {
      updateCheckoutData(id, data).then(response => {
        var args = { 'system': '', 'status': '', 'applicant': store.getters.name, 'object': '', 'slip_no': '' }
        store.dispatch('checkouts/getCheckOutListViaPagination', args)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newCheckoutData({ commit }, data) {
    return new Promise((resolve, reject) => {
      newCheckoutData(data).then(response => {
        var args = { 'system': '', 'status': '', 'applicant': store.getters.name, 'object': '', 'slip_no': '' }
        store.dispatch('checkouts/getCheckOutListViaPagination', args)
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
