<template>
  <div class="dashboard-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <el-row>
            <el-col :xs="12" :sm="12" :lg="12">
              <el-input v-model="orderno" placeholder="订单号" clearable /></el-col>
          </el-row>
          <ProjectTestDetailChart ref="projectTestDetail" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ProjectTestDetailChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ProjectTestDetailChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectTestDetailChart from './components/ProjectTestDetailChart';
export default {
  name: 'Dashboard',
  components: { ProjectTestDetailChart },
  data() {
    return {
      orderno: ''
    };
  },
  watch: {
    orderno(newval) {
      if (newval) {
        this.$refs.projectTestDetail.initChart(newval)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
