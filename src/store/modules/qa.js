import { getQaHeadBySlipNo, deleteQaHead, getQaHead, newQaHead, updateQaHead } from '@/api/qa';

const state = {
}

const mutations = {
}

const actions = {
  getQaHead({ commit }, id) {
    return new Promise((resolve, reject) => {
      getQaHead(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newQaHead({ commit }, data) {
    return new Promise((resolve, reject) => {
      newQaHead(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getQaHeadBySlipNo({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getQaHeadBySlipNo(slip_no).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteQaHead({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteQaHead(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateQaHead({ commit }, args) {
    const { id, data } = args
    return new Promise((resolve, reject) => {
      updateQaHead(id, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
