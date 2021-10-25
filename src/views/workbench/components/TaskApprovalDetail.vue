<template>
  <div class="goTop div-container">
    <el-row class="row-top">
      <el-col :span="24">
        <div v-if="qahead.ftesttyp === 'MCL'">
          <QaMclTargetActual />
        </div>
        <div v-if="qahead.ftesttyp === 'PCL'">
          <QaPclTargetActual />
        </div>
      </el-col>
    </el-row>

    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:right;">
          <el-button-group>
            <el-button
              v-show="isCanApproval()"
              plain
              @click="resultApproval()"
            >审核</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="qadetails"
      tooltip-effect="dark"
      border
      size="medium"
      style="margin-top:5px"
      :row-class-name="unApprovalClass"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column
        prop="fclass1"
        label="分类1"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="fclass2"
        label="分类2"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="fregression" label="回归？" width="70">
        <template slot-scope="scope">
          <el-tag :type="regressionTag" disable-transitions>{{
            scope.row.fregression
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fapproval" label="状态" sortable width="110" />
      <el-table-column prop="fcontent" label="测试用例" />
      <el-table-column
        prop="ftestdte"
        label="测试日"
        width="100"
      />
      <el-table-column
        prop="ftestusr"
        label="测试者"
        width="100"
      />
    </el-table>

    <el-backtop target=".goTop" :bottom="100">
      <i class="el-icon-caret-top" />
    </el-backtop>
  </div>
</template>

<script>
import { getQaDetailByQaHead, updateQaHead } from '@/api/qa';
import store from '@/store';
import QaMclTargetActual from '@/views/qa/components/QaMclTargetActual';
import QaPclTargetActual from '@/views/qa/components/QaPclTargetActual';
export default {
  components: {
    QaMclTargetActual,
    QaPclTargetActual
  },
  data() {
    return {
      qaheadId: '',
      qahead: {},
      qadetails: []
    };
  },
  created: async function() {
    this.qaheadId = this.$route.query.qahf_id;
    this.getQaHead();
    this.refreshQaList();
  },

  methods: {
    isCanApproval() {
      if (this.qahead.fstatus === '1') {
        return true;
      } else {
        for (var i in this.qadetails) {
          if (this.qadetails[i].fapproval === '未审核') {
            return true;
          }
        }
      }
      return false;
    },
    unApprovalClass({ row }) {
      if (row.fapproval === '未审核') {
        return 'un-approval';
      }
    },

    async resultApproval() {
      this.qahead.fstatus = '2';
      var resp = await updateQaHead(this.qahead.id, this.qahead);
      if (resp.result === 'OK') {
        this.$message.success('审核成功');
        this.refreshQaList();
        await store.dispatch('workbench/getMyApproval');
      }
    },

    async getQaHead() {
      var resp = await store.dispatch('qa/getQaHead', this.qaheadId);
      this.qahead = resp.data;
    },

    async refreshQaList() {
      var resp = await getQaDetailByQaHead(this.qaheadId);
      if (resp.result === 'OK') {
        var qadata = resp.data;
        for (var i in qadata) {
          if (qadata[i].fregression === 'Y') {
            qadata[i].fregression = '是';
            this.regressionTag = '';
          } else {
            qadata[i].fregression = '否';
            this.regressionTag = 'info';
          }
          if (qadata[i].fapproval === 'Y') {
            qadata[i].fapproval = '已审核';
            this.approvalTag = '';
          } else {
            qadata[i].fapproval = '未审核';
            this.approvalTag = 'info';
          }
        }
        this.qadetails = resp.data;
      }
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
.goTop {
  height: calc(100vh - 70px);
  overflow-x: hidden;
}
.un-approval {
  background: oldlace;
}
</style>
