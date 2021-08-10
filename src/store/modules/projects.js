import {
  getProjectMclList
} from '@/api/projects';
import { getQaHeadBySlipNo } from '@/api/qa';
import store from '..';

const state = {
  project_mcl_list: [],
  project_pcl_list: [],
  slip_status_filters: [],
  qa_status_filters: [],
  slip_slip_filters: [],
  slip_assigned_to_filters: [],
  span_list: []
};

const mutations = {
  SET_PROJECT_PCL_LIST(state, project_pcl_list) {
    for (var i in project_pcl_list) {
      if (project_pcl_list[i].fstatus === '1') {
        project_pcl_list[i].fstatus = '初始';
        project_pcl_list[i].tagtype = 'info';
      } else if (project_pcl_list[i].fstatus === '2') {
        project_pcl_list[i].fstatus = '已审核';
        project_pcl_list[i].tagtype = '';
      } else if (project_pcl_list[i].fstatus === '3') {
        project_pcl_list[i].fstatus = '已提交';
        project_pcl_list[i].tagtype = 'warning';
      } else if (project_pcl_list[i].fstatus === '4') {
        project_pcl_list[i].fstatus = '已确认';
        project_pcl_list[i].tagtype = 'success';
      }
    }
    state.project_pcl_list = project_pcl_list
  },

  SET_PROJECT_MCL_LIST(state, project_mcl_list) {
    state.project_mcl_list = []
    for (var i in project_mcl_list) {
      var slip_json = {};
      var assignedto_json = {};
      var slip_status_json = {};
      var qa_status_json = {};

      var isSlipExisted = false;
      var isAssignedtoExisted = false;
      var isSlipStatusExisted = false;
      var isQAStatusExisted = false;

      var slip_id = project_mcl_list[i].slip_id;
      var slip_slip = project_mcl_list[i].slip_slip;
      var slip_type = project_mcl_list[i].slip_type;
      var slip_status = project_mcl_list[i].slip_status;
      var slip_brief = project_mcl_list[i].slip_brief;
      var slip_content = project_mcl_list[i].slip_content;
      var slip_analyse = project_mcl_list[i].slip_analyse;
      var slip_solution = project_mcl_list[i].slip_solution;
      var slip_assignedto = project_mcl_list[i].slip_assignedto;
      var slip_plnstart = project_mcl_list[i].slip_plnstart;
      var slip_plnend = project_mcl_list[i].slip_plnend;
      var slip_actstart = project_mcl_list[i].slip_actstart;
      var slip_actend = project_mcl_list[i].slip_actend;
      var slip_release = project_mcl_list[i].slip_release;
      var slip_plnmanpower = project_mcl_list[i].slip_plnmanpower;
      var slip_actmanpower = project_mcl_list[i].slip_actmanpower;
      var design_id = project_mcl_list[i].design_id;
      var qa_id = project_mcl_list[i].qa_id;
      var qa_object = project_mcl_list[i].qa_object;
      var qa_status = project_mcl_list[i].qa_status;
      var qa_modification = project_mcl_list[i].qa_modification;
      var code_id = project_mcl_list[i].code_id;

      var slip_plan = slip_plnstart + ' ~ ' + slip_plnend;
      var slip_actual = '';

      if (slip_status === '1') {
        slip_status = '待办';
      } else if (slip_status === '2') {
        slip_status = '进行中';
        slip_actual = slip_actstart;
      } else if (slip_status === '3') {
        slip_status = '已完成';
        slip_actual = slip_actstart + ' ~ ' + slip_actend;
      } else if (slip_status === '4') {
        slip_status = '已发布';
        slip_actual = slip_actstart + ' ~ ' + slip_actend;
      }

      var qa_tagtype = '';

      if (qa_status === '1') {
        qa_status = '初始';
        qa_tagtype = 'info';
      } else if (qa_status === '2') {
        qa_status = '已审核';
        qa_tagtype = '';
      } else if (qa_status === '3') {
        qa_status = '已提交';
        qa_tagtype = 'warning';
      } else if (qa_status === '4') {
        qa_status = '已确认';
        qa_tagtype = 'success';
      }

      var project = {
        slip_id: slip_id,
        slip_slip: slip_slip,
        slip_type: slip_type,
        slip_status: slip_status,
        slip_brief: slip_brief,
        slip_assignedto: slip_assignedto,
        slip_plan: slip_plan,
        slip_actual: slip_actual,
        slip_release: slip_release,
        slip_plnmanpower: slip_plnmanpower,
        slip_actmanpower: slip_actmanpower,
        design_id: design_id,
        qa_id: qa_id,
        qa_object: qa_object,
        qa_status: qa_status,
        qa_tagtype: qa_tagtype,
        qa_modification: qa_modification,
        code_id: code_id,
        slip_content,
        slip_analyse,
        slip_solution
      };

      slip_json.text = slip_slip;
      slip_json.value = slip_slip;

      assignedto_json.text = slip_assignedto;
      assignedto_json.value = slip_assignedto;

      slip_status_json.text = slip_status;
      slip_status_json.value = slip_status;

      qa_status_json.text = qa_status;
      qa_status_json.value = qa_status;

      for (var j in state.slip_slip_filters) {
        if (state.slip_slip_filters[j].text === slip_slip) {
          isSlipExisted = true;
          continue;
        }
      }

      if (!isSlipExisted) {
        state.slip_slip_filters.push(slip_json);
      }

      for (var k in state.slip_assigned_to_filters) {
        if (state.slip_assigned_to_filters[k].text === slip_assignedto) {
          isAssignedtoExisted = true;
          continue;
        }
      }

      if (!isAssignedtoExisted) {
        state.slip_assigned_to_filters.push(assignedto_json);
      }

      for (var l in state.slip_status_filters) {
        if (state.slip_status_filters[l].text === slip_status) {
          isSlipStatusExisted = true;
          continue;
        }
      }

      if (!isSlipStatusExisted) {
        state.slip_status_filters.push(slip_status_json);
      }

      for (var m in state.qa_status_filters) {
        if (state.qa_status_filters[m].text === qa_status) {
          isQAStatusExisted = true;
          continue;
        }
      }

      if (!isQAStatusExisted) {
        state.qa_status_filters.push(qa_status_json);
      }

      state.project_mcl_list.push(project);
    }
    store.commit('projects/SET_SPAN_LIST', state.project_mcl_list)
  },
  SET_SPAN_LIST(state, data) {
    var pos = 0
    state.span_list = [];
    if (data === null) {
      return;
    }
    for (var i = 0; i < data.length; i++) {
      if (i === 0) {
        state.span_list.push(1);
        pos = 0;
      } else {
        if (data[i].slip_id === data[i - 1].slip_id) {
          // 如果ID一样则需要进行合并
          state.span_list[pos] += 1;
          state.span_list.push(0);
        } else {
          state.span_list.push(1);
          pos = i;
        }
      }
    }
  }
};

const actions = {
  getProjectMclList({ commit }, order_no) {
    return new Promise((resolve, reject) => {
      getProjectMclList(order_no)
        .then(response => {
          const {
            data
          } = response
          commit('SET_PROJECT_MCL_LIST', data)
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getProjectPclList({ commit }, order_no) {
    return new Promise((resolve, reject) => {
      getQaHeadBySlipNo(order_no).then(response => {
        const { data } = response
        commit('SET_PROJECT_PCL_LIST', data)
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
