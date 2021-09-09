import {
  getMyTaskBar,
  myProjectItems,
  getLiaisonsViaPagination,
  deleteLiaison,
  updateLiaisonStatus,
  newLiaison,
  syncLiaisonBySirNo,
  getSingleLiaison,
  modifyLiaison,
  liaisonFileUpdate,
  getProjectMclDataStatistics,
  getSingleLiaisonBySlipNo,
  getMyMCL,
  getMyPCL
} from '@/api/workbench';
import store from '..';

const state = {
  task_bar: {},
  project_items: {},
  slip_no_items: {},
  slip_current_page: 1,
  slip_page_size: 10,
  slip_page_count: 1,
  slip_count: 0,
  slip_table: [],
  task_test_mcl: [],
  task_test_pcl: [],
  task_approval: [],
  task_confirm: [],
  task_release: []
};

const mutations = {
  SET_TASK_BAR(state, task_bar) {
    state.task_bar = task_bar
  },
  SET_PROJECT_ITEMS(state, project_items) {
    state.project_items = project_items
  },
  SET_SLIP_NO_ITEMS(state, slip_no_items) {
    state.slip_no_items = slip_no_items
  },
  SET_SLIP_CURRENT_PAGE(state, current_page) {
    state.slip_current_page = current_page
  },
  SET_SLIP_PAGE_SIZE(state, page_size) {
    state.slip_page_size = page_size
  },
  SET_SLIP_PAGE_COUNT(state) {
    var liaisonCount = state.slip_no_items.count
    var pageSize = state.slip_page_size
    var remainder = liaisonCount % pageSize

    state.slip_count = liaisonCount
    if (remainder === 0) {
      state.slip_page_count = liaisonCount / pageSize
    } else {
      state.slip_page_count = parseInt(liaisonCount / pageSize) + 1
    }
  },
  SET_SLIP_TABLE(state) {
    state.slip_table = []
    var liaisons = state.slip_no_items.results;

    for (var i in liaisons) {
      var id = liaisons[i].id;
      var ftype = liaisons[i].ftype;
      var fstatus = liaisons[i].fstatus;
      var fslipno = liaisons[i].fslipno;
      var fbrief = liaisons[i].fbrief;
      var fplnstart = liaisons[i].fplnstart;
      var fplnend = liaisons[i].fplnend;
      var factstart = liaisons[i].factstart;
      var factend = liaisons[i].factend;
      var freleasedt = liaisons[i].freleasedt;
      var fodrno = liaisons[i].fodrno;

      var plan = fplnstart + ' ~ ' + fplnend;
      var actual = '';

      if (fstatus === '1') {
        fstatus = '待办';
      } else if (fstatus === '2') {
        fstatus = '进行中';
        actual = factstart;
      } else if (fstatus === '3') {
        fstatus = '已完成';
        actual = factstart + ' ~ ' + factend;
      } else if (fstatus === '4') {
        fstatus = '已发布';
        actual = factstart + ' ~ ' + factend;
      }

      var liaison = {
        id: id,
        ftype: ftype,
        fstatus: fstatus,
        fslipno: fslipno,
        fbrief: fbrief,
        plan: plan,
        actual: actual,
        freleasedt: freleasedt,
        fodrno: fodrno
      };
      state.slip_table.push(liaison);
    }
  },
  SET_TASK_TEST_MCL(state, data) {
    state.task_test_mcl = data
  },
  SET_TASK_TEST_PCL(state, data) {
    state.task_test_pcl = data
  },
  SET_TASK_APPROVAL(state, data) {

  },
  SET_TASK_CONFIRM(state, data) {

  },
  SET_TASK_RELEASE(state, data) {

  }
};

const actions = {

  getMyTaskBar({ commit }) {
    return new Promise((resolve, reject) => {
      getMyTaskBar().then(response => {
        const { data } = response
        commit('SET_TASK_BAR', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshProjectItems({ commit }) {
    return new Promise((resolve, reject) => {
      myProjectItems()
        .then(response => {
          const { data } = response;
          commit('SET_PROJECT_ITEMS', data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getLiaisonsViaPagination({ commit, state }) {
    var page = store.getters.slip_current_page
    var size = store.getters.slip_page_size
    return new Promise((resolve, reject) => {
      getLiaisonsViaPagination(page, size)
        .then(response => {
          const { data } = response
          commit('SET_SLIP_NO_ITEMS', data)
          commit('SET_SLIP_PAGE_COUNT')
          commit('SET_SLIP_TABLE')
          resolve(data)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteLiaison({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteLiaison(id).then(response => {
        store.dispatch('workbench/getLiaisonsViaPagination')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateLiaisonStatus({ commit }, args) {
    return new Promise((resolve, reject) => {
      const { id, data } = args
      updateLiaisonStatus(id, data).then(response => {
        store.dispatch('workbench/getLiaisonsViaPagination')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newLiaison({ commit }, data) {
    return new Promise((resolve, reject) => {
      newLiaison(data).then(response => {
        store.dispatch('workbench/getLiaisonsViaPagination')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSingleLiaison({ commit }, id) {
    return new Promise((resolve, reject) => {
      getSingleLiaison(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  modifyLiaison({ commit }, { id, data }) {
    return new Promise((resolve, reject) => {
      modifyLiaison(id, data).then(response => {
        store.dispatch('workbench/getLiaisonsViaPagination')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  liaisonFileUpdate({ commit }, data) {
    return new Promise((resolve, reject) => {
      liaisonFileUpdate(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  syncLiaisonBySirNo({ commit }, sir_no) {
    return new Promise((resolve, reject) => {
      syncLiaisonBySirNo(sir_no).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getProjectMclDataStatistics({ commit }, order_no) {
    return new Promise((resolve, reject) => {
      getProjectMclDataStatistics(order_no).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSingleLiaisonBySlipNo({ commit }, slip_no) {
    return new Promise((resolve, reject) => {
      getSingleLiaisonBySlipNo(slip_no).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMyMCL({ commit }) {
    return new Promise((resolve, reject) => {
      getMyMCL().then(response => {
        const { data } = response
        commit('SET_TASK_TEST_MCL', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMyPCL({ commit }) {
    return new Promise((resolve, reject) => {
      getMyPCL().then(response => {
        const { data } = response
        commit('SET_TASK_TEST_PCL', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
};

export default {
  namespaced: true,
  mutations,
  state,
  actions
};
