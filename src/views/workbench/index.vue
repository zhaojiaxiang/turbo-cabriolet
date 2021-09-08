<template>
  <div class="workbench-editor-container">
    <TaskGroupBar />

    <el-row>
      <ProjectItem />
    </el-row>
    <el-row style="margin-bottom:3px">
      <el-col :span="12">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">我的任务</h3>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="text-align:right;">
          <el-button plain @click="openSlipNoNew">新建联络票</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <SlipNoItem />
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
  name: 'WorkBench',
  components: {
    TaskGroupBar,
    ProjectItem,
    SlipNoItem,
    SlipNoNew,
    SlipNoModify
  },
  data() {
    return {};
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
  padding: 4px 32px 4px 32px;
  position: relative;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.vertical {
  display: table-cell;
  height: 36px;
  vertical-align: middle;
}
</style>
