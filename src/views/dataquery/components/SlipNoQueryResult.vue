<template>
  <div>
    <el-table v-if="display" :data="tableData" border size="medium">
      <el-table-column label="详情" type="expand" width="70">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="联络票：">
              <span>{{ props.row.fslipno }}</span>
            </el-form-item>
            <el-form-item label="SIR NO：">
              <span>{{ props.row.fsirno }}</span>
            </el-form-item>
            <el-form-item label="订单号：">
              <span>{{ props.row.fodrno }}</span>
            </el-form-item>
            <el-form-item label="开发概要：">
              <span>{{ props.row.fbrief }}</span>
            </el-form-item>
            <el-form-item label="问题描述：">
              <span>{{ props.row.fcontent }}</span>
            </el-form-item>
            <el-form-item label="问题分析：">
              <span>{{ props.row.fanalyse }}</span>
            </el-form-item>
            <el-form-item label="解决方案：">
              <span>{{ props.row.fsolution }}</span>
            </el-form-item>
            <el-form-item label="计划日期">
              <span>{{ props.row.plan }}</span>
            </el-form-item>
            <el-form-item label="计划工时">
              <span>{{ props.row.fplnmanpower }}</span>
            </el-form-item>
            <el-form-item label="实际日期">
              <span>{{ props.row.actual }}</span>
            </el-form-item>
            <el-form-item label="实际工时">
              <span>{{ props.row.factmanpower }}</span>
            </el-form-item>
            <el-form-item label="发布日期">
              <span>{{ props.row.freleasedt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="fstatus" label="状态" sortable width="80">
        <template slot-scope="scope">
          <el-tag
            :class="statusTagClass(scope.row.fstatus)"
            disable-transitions
            effect="plain"
          >{{ scope.row.fstatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ftype" label="类型" width="140">
        <template slot-scope="scope">
          <el-tag
            :type="typeTagClass(scope.row.ftype)"
            disable-transitions
            effect="plain"
          >{{ scope.row.ftype }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fslipno" label="联络票号" min-width="160">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openSlipNoQa(scope.row.fslipno)"
          >{{ scope.row.fslipno }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="fsirno" label="SIR号" min-width="100" />
      <el-table-column prop="fodrno" label="订单号" min-width="100" />
      <el-table-column
        prop="fbrief"
        label="详情"
        min-width="370"
        show-overflow-tooltip
      />
      <el-table-column prop="freleaserpt" label="变更报告" min-width="100">
        <template slot-scope="scope">
          <el-link
            :underline="false"
            type="primary"
            icon="el-icon-download"
            :href="scope.row.freleaserpt"
          >下载</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLiaisonsViaParam } from '@/api/workbench';
export default {
  data() {
    return {
      display: true,
      tableData: []
    };
  },
  methods: {
    typeTagClass(type) {
      if (type === '追加开发') {
        return 'success';
      } else if (type === '改善需求') {
        return 'warning';
      } else {
        return 'danger';
      }
    },

    statusTagClass(status) {
      if (status === '待办') {
        return 'status-1';
      } else if (status === '进行中') {
        return 'status-2';
      } else if (status === '已完成') {
        return 'status-3';
      } else {
        return 'status-4';
      }
    },

    openSlipNoQa(fslipno) {
      this.$router.push({ name: 'QA', query: { slip_no: fslipno }});
    },

    async refreshLiaisons(slip, order, sirno) {
      this.tableData = [];
      var resp = await getLiaisonsViaParam(
        '',
        '',
        slip,
        '',
        '',
        order,
        '',
        '',
        '',
        sirno
      );

      var liaisons = [];
      console.log(resp);
      liaisons = resp.data;

      for (var i in liaisons) {
        var id = liaisons[i].id;
        var ftype = liaisons[i].ftype;
        var fstatus = liaisons[i].fstatus;
        var fslipno = liaisons[i].fslipno;
        var fbrief = liaisons[i].fbrief;
        var fplnstart = liaisons[i].fplnstart;
        var fplnend = liaisons[i].fplnend;
        var factstart = liaisons[i].factstart;
        var factend = liaisons[i].factend;
        var freleasedt = liaisons[i].freleasedt;
        var fodrno = liaisons[i].fodrno;
        var fsirno = liaisons[i].fsirno;
        var fplnmanpower = liaisons[i].fplnmanpower;
        var factmanpower = liaisons[i].factmanpower;
        var freleaserpt = liaisons[i].freleaserpt;

        freleaserpt = 'media/upload/file/' + freleaserpt;

        var plan = fplnstart + ' ~ ' + fplnend;
        var actual = '';

        if (fstatus === '1') {
          fstatus = '待办';
        } else if (fstatus === '2') {
          fstatus = '进行中';
          actual = factstart;
        } else if (fstatus === '3') {
          fstatus = '已完成';
          actual = factstart + ' ~ ' + factend;
        } else if (fstatus === '4') {
          fstatus = '已发布';
          actual = factstart + ' ~ ' + factend;
        }

        var liaison = {
          id: id,
          ftype: ftype,
          fstatus: fstatus,
          fslipno: fslipno,
          fbrief: fbrief,
          plan: plan,
          actual: actual,
          freleasedt: freleasedt,
          fodrno: fodrno,
          fsirno: fsirno,
          fplnmanpower,
          factmanpower,
          freleaserpt
        };
        this.tableData.push(liaison);
      }
    }
  }
};
</script>

<style scoped>
.status-1 {
  background-color: #fbe6d4;
  border-color: #fbe6d4;
  color: #ffa931;
}
.status-2 {
  background-color: #fecb89;
  border-color: #fecb89;
  color: #fff;
}
.status-3 {
  background-color: #ffa931;
  color: #fff;
  border-color: #ffa931;
}
.status-4 {
  background-color: #b9ac92;
  border-color: #b9ac92;
  color: #fff;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin: 0;
  width: 100%;
}
</style>
