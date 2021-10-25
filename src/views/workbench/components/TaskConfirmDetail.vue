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
        <div style="text-align:right">
          <el-button-group>
            <el-button
              v-show="isCanConfirm()"
              @click="resultRollback()"
            >结果回退</el-button>
            <el-button
              v-show="isCanConfirm()"
              @click="resultConfirm()"
            >确认</el-button>
            <el-button
              v-show="isCanRollbackConfirm()"
              @click="resultRollbackConfirm()"
            >取消确认</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="qadetails"
      tooltip-effect="dark"
      border
      size="medium"
      class="card-shadow"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column
        prop="fclass1"
        label="分类1"
        sortable
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="fclass2"
        label="分类2"
        sortable
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
      <el-table-column prop="fapproval" label="状态" width="70" />
      <el-table-column prop="fcontent" label="测试用例" />
      <el-table-column prop="ftestdte" label="测试日" width="100" />
      <el-table-column prop="ftestusr" label="测试者" width="100" />
      <el-table-column
        prop="fresult"
        label="结果"
        width="100"
        :filters="[
          { text: 'NULL', value: null },
          { text: 'OK', value: 'OK' },
          { text: 'NG', value: 'NG' },
          { text: 'NGOK', value: 'NGOK' },
          { text: 'CANCEL', value: 'CANCEL' }
        ]"
        :filter-method="filterResult"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="handleTag(scope.row.fresult)">{{
            scope.row.fresult
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="贴图" width="100">
        <template slot-scope="scope">
          <el-link
            v-show="isCanImage(scope.row.test_tag)"
            type="primary"
            :underline="false"
            style="margin-left:15px"
            @click="handleContentText(scope.row.id)"
          >{{ scope.row.test_tag }}</el-link>
        </template>
      </el-table-column>
    </el-table>

    <TaskConfirmResult ref="QaConfirm" @confirmed="confirmed()" />

    <el-backtop target=".goTop" :bottom="100">
      <i class="el-icon-caret-top" />
    </el-backtop>
  </div>
</template>

<script>
import { getQaDetailByQaHead, updateQaHead } from '@/api/qa';
import TaskConfirmResult from './TaskConfirmResult';
import store from '@/store';
import QaMclTargetActual from '@/views/qa/components/QaMclTargetActual';
import QaPclTargetActual from '@/views/qa/components/QaPclTargetActual';
export default {
  components: {
    TaskConfirmResult,
    QaMclTargetActual,
    QaPclTargetActual
  },
  data() {
    return {
      loading: false,
      qaheadId: '',
      qahead: {},
      qadetails: []
    };
  },
  mounted: async function() {
    this.loading = true;
    this.qaheadId = this.$route.query.qahf_id;
    this.getQaHead();
    this.refreshQaList();
    this.loading = false;
  },

  methods: {
    isCanRollbackConfirm() {
      if (this.qahead.fstatus === '4') {
        return true;
      }
      return false;
    },

    handleTag(result) {
      if (!result) {
        return '';
      } else if (result === 'OK' || result === 'NGOK') {
        return 'success';
      } else if (result === 'NG') {
        return 'danger';
      } else {
        return 'info';
      }
    },

    isCanConfirm() {
      if (this.qahead.fstatus === '3') {
        return true;
      }
      return false;
    },

    isCanImage(test_tag) {
      if (test_tag === '贴图' && this.qahead.fstatus === '4') {
        return false;
      }
      return true;
    },

    confirmed() {
      this.refreshQaList();
    },

    async resultRollbackConfirm() {
      this.$confirm('此操作将撤回确认结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            this.qahead.fstatus = '3';
            var resp = await updateQaHead(this.qahead.id, this.qahead);
            if (resp.result === 'OK') {
              this.$message.success('确认结果撤回成功');
              this.refreshQaList();
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          });
        });
    },

    handleContentText(id) {
      this.$router.push({
        name: 'QaContentText',
        query: { type: 'approval', qadf_id: id }
      });
    },

    async resultRollback() {
      this.$confirm('此操作将取消确认该对象, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            this.qahead.fstatus = '2';
            var resp = await updateQaHead(this.qahead.id, this.qahead);

            if (resp.result === 'OK') {
              this.$message.success('结果回退成功');
              this.refreshQaList();
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          });
        });
    },

    resultConfirm() {
      this.$refs.QaConfirm.handleDialog(this.qahead.id);
    },

    filterResult(value, row) {
      return row.fresult === value;
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
</style>
