<template>
  <div class="div-container">
    <el-row class="row-top">
      <el-col :xs="24" :sm="24" :lg="24" align="middle">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="订单号:">
            <el-input v-model="form.order_no" />
          </el-form-item>
          <el-form-item>
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              @click="onQuery"
            >查询</el-button>
          </el-form-item>
        </el-form></el-col>
    </el-row>
    <ReportQueryDetail ref="ReportQueryDetail" />
  </div>
</template>

<script>
import ReportQueryDetail from '@/views/dataquery/components/ReportQueryDetail'
export default {
  components: {
    ReportQueryDetail
  },
  data() {
    return {
      fullscreenLoading: false,
      form: {
        order_no: ''
      }
    };
  },
  created: async function() {
    this.fullscreenLoading = true;
    this.fullscreenLoading = false;
  },
  methods: {
    async onQuery() {
      this.fullscreenLoading = true;
      if (this.form.order_no) {
        this.$refs.ReportQueryDetail.refreshReportList(this.form.order_no)
      }
      this.fullscreenLoading = false;
    }

  }
};
</script>

<style scoped>
.div-container {
  padding: 4px 32px 4px 32px;
  position: relative;
}

.row-top {
  margin-top: 10px;
}

.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
</style>
