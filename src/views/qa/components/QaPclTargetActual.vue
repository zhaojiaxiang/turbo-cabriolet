<template>
  <div>
    <el-table
      :data="qa_pcl_target_actual"
      border
      size="medium"
      :cell-class-name="tableCellClassName"
      :highlight-current-row="true"
    >
      <el-table-column prop="actual_tests" label="实际测试数" min-width="110" />
      <el-table-column prop="actual_ng" label="实际NG数" min-width="100" />
      <el-table-column prop="actual_ngok" label="实际NGOK数" min-width="110" />
      <el-table-column prop="actual_ng_rate" label="测试检出率" min-width="110" />
    </el-table>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {

  computed: {
    ...mapGetters(['qa_pcl_target_actual'])
  },

  created: async function() {
    var qahead_id = this.$route.query.qahf_id
    await store.dispatch('qa/refreshPclTargetActual', qahead_id)
  },

  methods: {
    tableCellClassName({ row, columnIndex }) {
      if (columnIndex === 3) {
        var actual_ng_rate = row.actual_ng_rate;
        actual_ng_rate = actual_ng_rate.replace('%', '');
        actual_ng_rate = parseFloat(actual_ng_rate);
        if ((actual_ng_rate > 10) | (actual_ng_rate < 5)) {
          return 'danger-cell';
        }
        return '';
      }
    }
  }
};
</script>

<style scoped>
.warning-cell {
  background-color: #ffd3b4;
}
.danger-cell {
  background-color: #ffaaa7;
}
</style>
