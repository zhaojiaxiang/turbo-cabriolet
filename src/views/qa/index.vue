<template>
  <div class="dashboard-editor-container">
    <QaNew />
    <QaList />
  </div>
</template>

<script>
import QaNew from './components/QaNew';
import QaList from './components/QaList';
import store from '@/store';
export default {
  components: {
    QaNew,
    QaList
  },
  data() {
    return {
      liaison: {}
    }
  },
  created: async function() {
    var slip_no = this.$route.query.slip_no;
    var resp = await store.dispatch('workbench/getSingleLiaisonBySlipNo', slip_no)
    if (resp.result === 'OK') {
      this.liaison = resp.data[0]
    }
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
