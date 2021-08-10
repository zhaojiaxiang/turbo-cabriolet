<template>
  <div class="dashboard-editor-container">
    <ProjectMclList />
  </div>
</template>

<script>
// import store from '@/store';
import ProjectMclList from './components/ProjectMclList';

export default {
  name: 'Project',
  components: {
    ProjectMclList
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 16px 32px 16px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
