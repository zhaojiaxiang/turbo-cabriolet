import {
  getQaHeadBySlipNo,
  deleteQaHead,
  getQaHead,
  newQaHead,
  updateQaHead,
  updateQaHeadSummary,
  getQaSlipNoCheckOutObject,
  getQaDetailByQaHeadViaPagination,
  deleteQaDetail,
  updateQaDetailResult,
  putDefaultOK,
  codeReviewInspection,
  getMclTargetActual,
  newQaDetail,
  batchNewQaDetail,
  updateQaDetail,
  fileUpload,
  getPclQaClass1,
  getPclQaClass2,
  getPclDetailViaClass
} from '@/api/qa';
import store from '..';

const state = {
  qa_list: [],
  qa_mcl_list: [],
  qa_mcl_target_actual: [],
  qa_pcl_target_actual: [],
  qa_pcl_class1_list: [],
  qa_pcl_class2_list: [],
  qa_pcl_list: [],
  qa_mcl_current_page: 1,
  qa_mcl_page_size: 20,
  qa_mcl_page_count: 1,
  qa_mcl_count: 0
};

const mutations = {
  SET_PAGE_SIZE(state, page_size) {
    state.qa_mcl_page_size = page_size
  },
  SET_PAGE_COUNT(state, page_count) {
    state.qa_mcl_page_count = page_count
  },
  SET_CURRENT_PAGE(state, current_page) {
    state.qa_mcl_current_page = current_page
  },
  SET_COUNT(state, count) {
    state.qa_mcl_count = count
  },
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
    state.qa_list = data;
  },
  SET_QA_MCL_LIST(state, data) {
    for (var i in data) {
      if (data[i].fregression === 'Y') {
        data[i].fregression = '是';
        this.regressionTag = '';
      } else {
        data[i].fregression = '否';
        this.regressionTag = 'info';
      }
      if (data[i].fapproval === 'Y') {
        data[i].fapproval = '已审核';
        this.approvalTag = '';
      } else {
        data[i].fapproval = '未审核';
        this.approvalTag = 'info';
      }
    }
    state.qa_mcl_list = data;
  },
  REFRESH_QA_MCL_LIST(state, data) {
    for (var i in data) {
      if (data[i].id === state.qa_mcl_list[1].id) {
        state.qa_mcl_list[1].test_tag = data[i].test_tag
      }
    }
  },
  SET_MCL_TARGET_ACTUAL(state, data) {
    state.qa_mcl_target_actual = []
    state.qa_mcl_target_actual.push(data)
  },
  SET_PCL_TARGET_ACTUAL(state, data) {
    state.qa_pcl_target_actual = []
    state.qa_pcl_target_actual.push(data)
  },
  SET_PCL_CLASS1_LIST(state, data) {
    state.qa_pcl_class1_list = data
  },
  SET_PCL_CLASS2_LIST(state, data) {
    state.qa_pcl_class2_list = data
  },
  SET_PCL_LIST(state, data) {
    for (var i in data) {
      if (data[i].fapproval === 'Y') {
        data[i].fapproval = '已审核';
        this.approvalTag = '';
      } else {
        data[i].fapproval = '未审核';
        this.approvalTag = 'info';
      }
    }
    state.qa_pcl_list = data
  }
};

const actions = {
  getQaHead({ commit }, id) {
    return new Promise((resolve, reject) => {
      getQaHead(id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  newQaHead({ commit }, data) {
    return new Promise((resolve, reject) => {
      newQaHead(data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQaListBySlipNo({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getQaHeadBySlipNo(slip_no)
        .then(response => {
          const { data } = response;
          commit('SET_QA_LIST', data);
          resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQaHeadBySlipNo({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getQaHeadBySlipNo(slip_no)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteQaHead({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteQaHead(id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateQaHead({ commit }, args) {
    const { id, data } = args;
    return new Promise((resolve, reject) => {
      updateQaHead(id, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateQaHeadSummary({ commit }, args) {
    const { id, data } = args;
    return new Promise((resolve, reject) => {
      updateQaHeadSummary(id, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQaSlipNoCheckOutObject({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getQaSlipNoCheckOutObject(slip_no)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getQaDetailByQaHeadViaPagination({ commit }, id) {
    var page = store.getters.qa_mcl_current_page
    var size = store.getters.qa_mcl_page_size
    return new Promise((resolve, reject) => {
      getQaDetailByQaHeadViaPagination(size, page, id)
        .then(response => {
          const { data } = response
          const { count, pages, results } = data

          commit('SET_QA_MCL_LIST', results)
          commit('SET_PAGE_COUNT', pages)
          commit('SET_COUNT', count)
          store.dispatch('qa/refreshMclTargetActual', id)
          resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  refreshQaDetailByQaHeadViaPagination({ commit }, id) {
    var page = store.getters.qa_mcl_current_page
    var size = store.getters.qa_mcl_page_size
    return new Promise((resolve, reject) => {
      getQaDetailByQaHeadViaPagination(size, page, id)
        .then(response => {
          const { data } = response
          const { results } = data

          commit('SET_QA_MCL_LIST', results)

          resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  newQaDetail({ count }, data) {
    return new Promise((resolve, reject) => {
      newQaDetail(data).then(response => {
        const { data } = response
        store.dispatch('qa/getQaDetailByQaHeadViaPagination', data.qahf)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  batchNewQaDetail({ count }, args) {
    const { id, data } = args
    return new Promise((resolve, reject) => {
      batchNewQaDetail(data).then(response => {
        store.dispatch('qa/getQaDetailByQaHeadViaPagination', id)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteQaDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteQaDetail(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateQaDetailResult({ commit }, args) {
    const { id, data } = args
    return new Promise((resolve, reject) => {
      updateQaDetailResult(id, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateQaDetail({ commit }, args) {
    const { id, data } = args
    return new Promise((resolve, reject) => {
      updateQaDetail(id, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  putDefaultOK({ commit }, id) {
    return new Promise((resolve, reject) => {
      putDefaultOK(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  codeReviewInspection({ commit }, args) {
    const { object_id, slip_no } = args
    return new Promise((resolve, reject) => {
      codeReviewInspection(object_id, slip_no).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshMclTargetActual({ commit }, id) {
    return new Promise((resolve, reject) => {
      getMclTargetActual(id).then(response => {
        const { data } = response
        commit('SET_MCL_TARGET_ACTUAL', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshPclTargetActual({ commit }, id) {
    return new Promise((resolve, reject) => {
      getMclTargetActual(id).then(response => {
        const { data } = response
        commit('SET_PCL_TARGET_ACTUAL', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fileUpload({ commit }, data) {
    return new Promise((resolve, reject) => {
      fileUpload(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshPclQaClass1({ commit }, id) {
    return new Promise((resolve, reject) => {
      getPclQaClass1(id).then(response => {
        const { data } = response
        commit('SET_PCL_CLASS1_LIST', data.class1)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshPclQaClass2({ commit }, args) {
    const { id, class1 } = args
    return new Promise((resolve, reject) => {
      getPclQaClass2(id, class1).then(response => {
        const { data } = response
        commit('SET_PCL_CLASS2_LIST', data[0].class2)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshPclListViaClass({ commit }, args) {
    const { id, class1, class2 } = args
    return new Promise((resolve, reject) => {
      getPclDetailViaClass(id, class1, class2).then(response => {
        const { data } = response
        commit('SET_PCL_LIST', data)
        resolve(resolve)
      }).catch(error => {
        reject(error)
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
