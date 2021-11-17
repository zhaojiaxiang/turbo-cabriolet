<template>
  <div class="dashboard-editor-container">
    <ProjectPclList />
    <ProjectMclList />
  </div>
</template>

<script>
import ProjectMclList from './ProjectMclList';
import ProjectPclList from './ProjectPclList';

export default {
  name: 'ProjectOverview',
  components: {
    ProjectMclList,
    ProjectPclList
  },
  data() {
    return {};
  },
  mounted: function() {
    this.order_no = this.$route.query.order_no;
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 4px 14px 4px 14px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
