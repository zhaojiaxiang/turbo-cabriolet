import { getQaHeadBySlipNo, deleteQaHead, getQaHead, newQaHead, updateQaHead, updateQaHeadSummary, getQaSlipNoCheckOutObject } from '@/api/qa';

const state = {
  qa_list: []
}

const mutations = {
  SET_QA_LIST(state, data) {
    for (var i in data) {
      var fstatus = data[i].fstatus;
      if (fstatus === '1') {
        data[i].fstatus = '初始';
        data[i].tagtype = 'info';
      } else if (fstatus === '2') {
        data[i].fstatus = '已审核';
        data[i].tagtype = '';
      } else if (fstatus === '3') {
        data[i].fstatus = '已提交';
        data[i].tagtype = 'warning';
      } else {
        data[i].fstatus = '已确认';
        data[i].tagtype = 'success';
      }
    }
    state.qa_list = data
  }
};

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
  getQaListBySlipNo({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getQaHeadBySlipNo(slip_no).then(response => {
        const { data } = response
        commit('SET_QA_LIST', data)
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
  },
  updateQaHeadSummary({ commit }, args) {
    const { id, data } = args
    return new Promise((resolve, reject) => {
      updateQaHeadSummary(id, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getQaSlipNoCheckOutObject({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getQaSlipNoCheckOutObject(slip_no).then(response => {
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
