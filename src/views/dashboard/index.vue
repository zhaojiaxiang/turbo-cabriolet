<template>
  <div class="dashboard-editor-container">
    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LiaisonPlanActualManPowerLineChart />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <LiaisonTypeScalePieChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ProjectBugRatePieChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <LiaisonTypeManPowerBarChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LiaisonPlanActualManPowerLineChart from './components/LiaisonPlanActualManPowerLineChart'
import LiaisonTypeScalePieChart from './components/LiaisonTypeScalePieChart'
import ProjectBugRatePieChart from './components/ProjectBugRatePieChart'
import LiaisonTypeManPowerBarChart from './components/LiaisonTypeManPowerBarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LiaisonPlanActualManPowerLineChart,
    LiaisonTypeScalePieChart,
    ProjectBugRatePieChart,
    LiaisonTypeManPowerBarChart
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 4px 32px 4px 32px;
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
