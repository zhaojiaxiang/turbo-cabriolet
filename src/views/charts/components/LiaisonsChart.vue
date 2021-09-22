<template>
  <div class="chart-container">
    <el-row class="row-top">
      <el-col :xs="24" :sm="24" :lg="24" align="middle">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-switch
              v-model="form.swich"
              inactive-text="个人统计"
              active-text="组别统计"
            />
          </el-form-item>
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
          <el-form-item v-show="isGroup" label="对应者:">
            <el-select v-model="form.person" clearable>
              <el-option
                v-for="item in persons"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-form></el-col>
    </el-row>
    <chart ref="liaison" height="80%" width="100%" />
  </div>
</template>

<script>
import Chart from './LiaisonsMixChart';
import { getWorkingOrganization, getOrganizationUsers } from '@/api/common';
export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      form: {
        organization_id: '',
        person: '',
        swich: false
      },
      organization: [],
      persons: [],
      isGroup: true
    };
  },
  watch: {
    form: {
      async handler(val) {
        if (val.swich) {
          this.isGroup = false
          if (val.organization_id) {
            this.$refs.liaison.initGroupLiaisonsChart(val.organization_id)
          }
        } else {
          this.isGroup = true
          if (val.organization_id) {
            this.persons = []
            var resp = await getOrganizationUsers(val.organization_id)
            this.persons = resp.data
          }
        }

        if (val.person) {
          this.$refs.liaison.initLiaisonsChart(val.person)
        }
      },
      deep: true
    }
  },
  created: async function() {
    var resp = await getWorkingOrganization();
    this.organization = resp.data;
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  padding: 32px;
}

.row-top {
  margin-top: 10px;
}
</style>
