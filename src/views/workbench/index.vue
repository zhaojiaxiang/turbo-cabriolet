<template>
  <div class="workbench-editor-container">
    <TaskGroupBar />

    <el-row>
      <ProjectItem />
    </el-row>
    <el-row style="margin-bottom: 3px">
      <el-col :span="16">
        <div style="text-align: left" class="vertical">
          <h3 style="margin: 0 auto">我的任务</h3>
        </div>
        <!-- <el-row :gutter="10">
            <el-col
              :span="3"
            ><h3 style="margin: 0 auto">我的任务</h3></el-col>
            <el-col
              :span="6"
            ><el-input v-model="queryForm.fslipno" clearable placeholder="联络票号" /></el-col>
            <el-col
              :span="5"
            ><el-input v-model="queryForm.fodrno" clearable placeholder="订单号" /></el-col>
            <el-col
              :span="4"
            ><el-input v-model="queryForm.fsirno" clearable placeholder="SIR号" /></el-col>
            <el-col
              :span="3"
            ><el-button type="primary" plain>检索</el-button></el-col>
            <el-col
              :span="3"
            ><el-button plain>重置</el-button></el-col>
          </el-row>
        </div> -->
      </el-col>
      <el-col :span="8">
        <div style="text-align: right">
          <el-button plain @click="openSlipNoNew">新建联络票</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <SlipNoItem ref="slipNoItem" />
    </el-row>

    <SlipNoNew />
    <SlipNoModify />
  </div>
</template>

<script>
import TaskGroupBar from './components/TaskGroupBar';
import ProjectItem from './components/ProjectItem';
import SlipNoItem from './components/SlipNoItem';
import SlipNoNew from './components/SlipNoNew';
import SlipNoModify from './components/SlipNoModify';
import store from '@/store';

export default {
  name: 'Workbench',
  components: {
    TaskGroupBar,
    ProjectItem,
    SlipNoItem,
    SlipNoNew,
    SlipNoModify
  },
  data() {
    return {
      queryForm: {
        fslipno: undefined,
        fodrno: undefined,
        fsirno: undefined
      }
    };
  },
  mounted: async function() {
    await store.dispatch('common/getProjects');
    await store.dispatch('common/getSystems');
    await store.dispatch('common/getGroupUsers');
    await store.dispatch('common/getAllGroupUsers');
    await store.dispatch('workbench/getMyTaskBar');
  },
  methods: {
    openSlipNoNew() {
      this.bus.$emit('openSlipNoNew');
    }
  }
};
</script>

<style lang="scss" scoped>
.workbench-editor-container {
  padding: 4px 14px 4px 14px;
  position: relative;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
</style>
