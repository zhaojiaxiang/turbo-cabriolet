<template>
  <div class="dashboard-editor-container">
    <QaMclTestList />
  </div>
</template>

<script>
import QaMclTestList from './QaMclTestList';
import store from '@/store';
export default {
  components: {
    QaMclTestList
  },
  data() {
    return {};
  },
  created: async function() {
    var slip_no = this.$route.query.slip_no;
    var resp = await store.dispatch(
      'workbench/getSingleLiaisonBySlipNo',
      slip_no
    );
    if (resp.result === 'OK') {
      this.liaison = resp.data[0];
    }
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
