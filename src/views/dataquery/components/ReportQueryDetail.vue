<template>
  <div style="margin:0 auto">
    <el-row>
      <el-col :span="3">
        <div class="grid-content" />
      </el-col>
      <el-col
        :span="17"
      ><div style="margin-top:30px">
        <el-button plain @click="openOrderInfo">查看所有项</el-button>
        <el-button
          :disabled="multipleslip.length === 0"
          plain
          @click="openPartOrderInfo"
        >查看选择项</el-button>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-top:10px"
          border
          stripe
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="selecttable"
          />
          <el-table-column prop="fsystemcd" label="系统名称" width="120" />
          <el-table-column prop="fslipno" label="联络票号" width="250" />
          <el-table-column prop="fsirno" label="Sir号" width="150" />
          <el-table-column
            prop="fbrief"
            label="开发概要"
            show-overflow-tooltip
          />
          <el-table-column fixed="right" label="查看单个报表" width="150">
            <template slot-scope="scope">
              <el-link
                type="primary"
                :underline="false"
                icon="el-icon-tickets"
                @click="openQaList(scope.row.fslipno)"
              />
            </template>
          </el-table-column>
        </el-table></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { getReportList, getReportPCLList } from '@/api/query';
export default {
  data() {
    return {
      tableData: [],
      multipleslip: '',
      order_no: ''
    }
  },
  methods: {
    async refreshReportList(order_no) {
      this.order_no = order_no
      var resp = await getReportList(order_no)
      this.tableData = resp.data;

      var resp_pcl = await getReportPCLList(order_no)

      if (resp_pcl.data) {
        resp_pcl.data.forEach(element => {
          this.tableData.push(element);
        });
      }
    },

    selecttable(row) {
      if (row.fsystemcd === 'PCL') {
        return false;
      } else {
        return true;
      }
    },

    handleSelectionChange(val) {
      var slip_arr = [];
      val.forEach(element => {
        slip_arr.push(element.fslipno);
      });
      this.multipleslip = slip_arr.join(',');
    },

    openQaList(slipno) {
      this.$router.push({ name: 'ReportSingle', query: { slipno: slipno }});
    },

    openOrderInfo() {
      this.$router.push({
        name: 'ReportMultiple',
        query: { order_no: this.order_no }
      });
    },

    openPartOrderInfo() {
      this.$router.push({
        name: 'ReportMultiple',
        query: { order_no: this.order_no, multiple_slip: this.multipleslip }
      });
    }
  }
};
</script>

<style>
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
