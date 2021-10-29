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
          <el-form-item label="联络票号:">
            <el-input v-model="form.slip_no" />
          </el-form-item>
          <el-form-item label="SIR号:">
            <el-input v-model="form.sir_no" />
          </el-form-item>
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
    <SlipNoQueryResult ref="SlipNoQueryResult" />
  </div>
</template>

<script>
import SlipNoQueryResult from '@/views/dataquery/components/SlipNoQueryResult';
export default {
  name: 'SlipNoQuery',
  components: {
    SlipNoQueryResult
  },
  data() {
    return {
      fullscreenLoading: false,
      form: {
        slip_no: '',
        sir_no: '',
        order_no: ''
      }
    };
  },
  methods: {
    async onQuery() {
      this.fullscreenLoading = true;
      this.$refs.SlipNoQueryResult.refreshLiaisons(this.form.slip_no, this.form.order_no, this.form.sir_no)
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
