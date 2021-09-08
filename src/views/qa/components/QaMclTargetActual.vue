<template>
  <div>
    <el-table
      :data="qa_mcl_target_actual"
      border
      size="medium"
      :cell-class-name="tableCellClassName"
      :highlight-current-row="true"
    >
      <el-table-column prop="target_tests" label="目标测试" min-width="80" />
      <el-table-column
        prop="target_regressions"
        label="目标回归测试"
        width="105"
      />
      <el-table-column prop="target_total" label="目标总测试" min-width="90" />
      <el-table-column prop="target_ng" label="目标NG" min-width="70" />
      <el-table-column prop="actual_tests" label="实际测试" min-width="80" />
      <el-table-column
        prop="actual_regressions"
        label="实际回归测试"
        min-width="105"
      />
      <el-table-column prop="actual_total" label="实际总测试" min-width="95" />
      <el-table-column prop="actual_ng" label="实际NG" min-width="75" />
    </el-table>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(['qa_mcl_target_actual'])
  },

  created: async function() {
    var qahead_id = this.$route.query.qahf_id
    await store.dispatch('qa/refreshMclTargetActual', qahead_id)
  },

  methods: {
    tableCellClassName({ row, columnIndex }) {
      var target_ng = row.target_ng;
      var target_regressions = row.target_regressions;
      var target_tests = row.target_tests;
      var target_total = row.target_total;
      var actual_ng = row.actual_ng;
      var actual_regressions = row.actual_regressions;
      var actual_tests = row.actual_tests;
      var actual_total = row.actual_total;
      if (columnIndex === 4) {
        if (actual_tests < target_tests) {
          return 'warning-cell';
        }
        return '';
      } else if (columnIndex === 5) {
        if (actual_regressions < target_regressions) {
          return 'warning-cell';
        }
        return '';
      } else if (columnIndex === 6) {
        if (actual_total < target_total) {
          return 'warning-cell';
        }
        return '';
      } else if (columnIndex === 7) {
        if (actual_ng < target_ng) {
          return 'warning-cell';
        } else if (actual_ng > target_ng * 1.2) {
          return 'danger-cell';
        }
        return '';
      }
    }
  }
};
</script>

<style>
.warning-cell {
  background-color: #ffd3b4;
}
.danger-cell {
  background-color: #ffaaa7;
}
</style>
