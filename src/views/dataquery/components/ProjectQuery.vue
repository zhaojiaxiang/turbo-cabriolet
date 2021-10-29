<template>
  <div class="div-container">
    <el-row class="row-top">
      <el-col :xs="24" :sm="24" :lg="24" align="middle">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="组别:">
            <el-select v-model="form.organization_id" clearable>
              <el-option
                v-for="item in organization"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="制番号:">
            <el-select v-model="form.project_code" clearable>
              <el-option
                v-for="item in project"
                :key="item.keyid"
                :label="item.id"
                :value="item.id"
              >
                <span style="float: left">{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input v-model="form.order_no" />
          </el-form-item>
          <el-form-item>
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              @click="onQuery"
            >查询</el-button>
          </el-form-item>
        </el-form></el-col>
    </el-row>
    <ProjectItemGroup ref="ProjectItemGroup" />
  </div>
</template>

<script>
import store from '@/store';
import ProjectItemGroup from '@/views/dataquery/components/ProjectItemGroup';
import { getWorkingOrganization, getWorkingProject } from '@/api/common';
export default {
  name: 'ProjectQuery',
  components: {
    ProjectItemGroup
  },
  data() {
    return {
      organization: [],
      project: [],
      fullscreenLoading: false,
      form: {
        organization_id: '',
        project_code: '',
        order_no: ''
      }
    };
  },
  watch: {
    form: {
      async handler(val) {
        if (val.organization_id) {
          await this.refreshProject(val.organization_id);
        } else {
          await this.refreshProject('');
        }
      },
      deep: true
    }
  },
  created: async function() {
    this.fullscreenLoading = true;
    var resp = await getWorkingOrganization();
    this.organization = resp.data;
    this.refreshProject('');
    this.fullscreenLoading = false;
  },
  methods: {
    async onQuery() {
      this.fullscreenLoading = true;
      store.commit('query/SET_QUERY_PROJECT_CURRENT_PAGE', 1);

      store.commit(
        'query/SET_QUERY_PROJECT_PROJECT_CODE',
        this.form.project_code
      );
      store.commit(
        'query/SET_QUERY_PROJECT_ORGANIZATION',
        this.form.organization_id
      );
      store.commit('query/SET_QUERY_PROJECT_ORDER_NO', this.form.order_no);

      await store.dispatch('query/refreshQueryProjectItemGroup');
      this.fullscreenLoading = false;
    },

    async refreshProject(organization_id) {
      var resp_project = await getWorkingProject(organization_id);
      this.project = resp_project.data;
    }
  }
};
</script>

<style scoped>
.div-container {
  padding: 4px 32px 4px 32px;
  position: relative;
}

.row-top {
  margin-top: 10px;
}

.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
</style>
