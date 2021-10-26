<template>
  <div class="goTop div-container">
    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h4 style="margin:0 auto;">
            分类1：{{ class1 }} 分类2：{{ class2 }}
          </h4>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" class="row-top">
        <div>
          <QaPclTargetActual />
        </div>
      </el-col>
    </el-row>

    <el-row class="row-top">
      <el-col :span="12">
        <div>
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            type="danger"
            :disabled="isCanBatchDelete()"
            @click="batchDeleteQaDetail()"
          >删除选中项</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="text-align:right;">
          <el-button-group>
            <el-button
              v-show="isCanAdd()"
              @click="singleAdd()"
            >逐条添加</el-button>
            <el-button
              v-show="isCanAdd()"
              @click="batchAdd()"
            >批量添加</el-button>
            <el-button
              v-show="isCanSubmit()"
              type="primary"
              plain
              @click="resultSubmit()"
            >提交结果</el-button>
            <el-button
              v-show="isCanRollback()"
              plain
              type="warning"
              @click="resultRollback()"
            >结果撤回</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="qa_pcl_list"
      tooltip-effect="dark"
      border
      size="medium"
      class="card-shadow row-top"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="fapproval" sortable label="状态" width="80" />
      <el-table-column prop="fcontent" label="测试用例" show-overflow-tooltip />
      <el-table-column prop="ftestdte" label="测试日" width="100" />
      <el-table-column prop="ftestusr" label="测试者" width="100" />
      <el-table-column
        v-if="qahead.fstatus !== '1'"
        prop="fresult"
        label="结果"
        width="100"
        sortable
        fixed="right"
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
          <el-dropdown trigger="click" @command="handleResult">
            <el-tag :type="handleTag(scope.row.fresult)">{{
              scope.row.fresult
            }}</el-tag>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :disabled="!isCanTest()"
                :command="beforeHandleResult('OK', scope.row)"
              >OK</el-dropdown-item>
              <el-dropdown-item
                :disabled="!isCanTest()"
                :command="beforeHandleResult('NG', scope.row)"
              >NG</el-dropdown-item>
              <el-dropdown-item
                :disabled="!isCanTest()"
                :command="beforeHandleResult('NGOK', scope.row)"
              >NGOK</el-dropdown-item>
              <el-dropdown-item
                :command="beforeHandleResult('CANCEL', scope.row)"
                :disabled="!isCanTest()"
              >CANCEL</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column label="贴图" fixed="right" sortable width="100">
        <template slot-scope="scope">
          <el-link
            v-if="qahead.fstatus !== '1'"
            type="primary"
            :underline="false"
            style="margin-left:15px"
            @click="handleContentText(scope.row.id)"
          >{{ scope.row.test_tag }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-link
            v-show="isCanEdit(scope.row)"
            type="primary"
            :underline="false"
            icon="el-icon-edit-outline"
            style="margin-left:15px"
            @click="singleModify(scope.row.id)"
          />
          <el-link
            v-show="isCanEdit(scope.row)"
            style="margin-left:20px"
            type="primary"
            :underline="false"
            icon="el-icon-delete"
            @click="singleDelete(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-backtop target=".goTop" :bottom="100">
      <i class="el-icon-caret-top" />
    </el-backtop>
    <QaSingleNewForPcl ref="QaSingleNewForPcl" />
    <QaBatchNewForPcl ref="QaBatchNewForPcl" />
    <QaSingleModifyForPcl ref="QaSingleModifyForPcl" />
  </div>
</template>

<script>
import QaPclTargetActual from '@/views/qa/components/QaPclTargetActual';
import QaSingleNewForPcl from '@/views/qa/components/QaSingleNewForPcl';
import QaBatchNewForPcl from '@/views/qa/components/QaBatchNewForPcl';
import QaSingleModifyForPcl from '@/views/qa/components/QaSingleModifyForPcl';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  name: 'TaskPclTestList',
  components: {
    QaPclTargetActual,
    QaSingleNewForPcl,
    QaBatchNewForPcl,
    QaSingleModifyForPcl
  },
  data() {
    return {
      loading: false,
      approvalTag: '',
      id: '',
      class1: '',
      class2: '',
      qahead: {},
      multipleSelection: []
    };
  },
  computed: {
    ...mapGetters(['qa_pcl_list'])
  },
  created: async function() {
    this.loading = true;
    this.id = this.$route.query.qahf_id;
    this.class1 = this.$route.query.class1;
    this.class2 = this.$route.query.class2;
    this.refreshQaList();
    this.getQaHead();
    this.loading = false;
  },

  methods: {
    isCanEdit(row) {
      if (row.fapproval === '已审核') {
        return false;
      } else {
        if (row.fcontent_text || row.fresult) {
          return false;
        }
      }
      return true;
    },

    isCanImage(test_tag) {
      if (this.qahead.fstatus === '2') {
        return true;
      } else {
        if (test_tag === '贴图') {
          return false;
        }
        return true;
      }
    },

    isCanAdd() {
      if (this.qahead.fstatus === '1' || this.qahead.fstatus === '2') {
        return true;
      }
      return false;
    },

    isCanTest() {
      if (this.qahead.fstatus === '2') {
        return true;
      }
      return false;
    },

    isCanRollback() {
      if (this.qahead.fstatus === '3') {
        return true;
      }
      return false;
    },

    isCanSubmit() {
      if (
        this.qahead.fstatus === '3' ||
        this.qahead.fstatus === '4' ||
        this.qahead.fstatus === '1'
      ) {
        return false;
      }

      for (var i in this.qa_pcl_list) {
        if (!this.qa_pcl_list[i].fresult) {
          return false;
        }
        if (this.qa_pcl_list[i].fresult === 'NG') {
          return false;
        }
      }
      return true;
    },

    isCanBatchDelete() {
      if ((this.qahead.fstatus === '1') & (this.qa_pcl_list.length > 0)) {
        var seleted = this.$refs.multipleTable.selection;
        if (seleted.length > 0) {
          return false;
        }
        return true;
      }
      return true;
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

    beforeHandleResult(item, row) {
      return {
        command: item,
        row: row
      };
    },

    handleContentText(id) {
      this.$router.push({
        name: 'QaContentText',
        query: { type: 'test', qadf_id: id }
      });
    },

    filterResult(value, row) {
      return row.fresult === value;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    singleAdd() {
      this.$refs.QaSingleNewForPcl.handleDialog(this.qahead.id);
    },

    batchAdd() {
      this.$refs.QaBatchNewForPcl.handleDialog(this.qahead.id);
    },

    singleModify(id) {
      this.$refs.QaSingleModifyForPcl.handleDialog(id);
    },

    async singleDelete(id) {
      var resp = await store.dispatch('qa/deleteQaDetail', id);

      if (resp.result === 'OK') {
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.refreshQaList();
      }
    },

    async handleResult(command) {
      var qadetailInfo = {};

      qadetailInfo['id'] = command.row.id;
      qadetailInfo['fresult'] = command.command;

      var orig_result = command.row.fresult;
      var new_result = command.command;

      if (
        (orig_result === 'NG' || orig_result === 'CANCEL') &&
        new_result === 'OK'
      ) {
        var info_message =
          '测试结果由 ' +
          orig_result +
          ' 修改到 ' +
          new_result +
          ' 不符合规定，是否继续?';
        this.$confirm(info_message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.updateResult(command.row.id, qadetailInfo);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          });
      } else {
        this.updateResult(command.row.id, qadetailInfo);
      }
    },

    async updateResult(qadetail_id, qadetailInfo) {
      var data = { id: qadetail_id, data: qadetailInfo };
      var resp = await store.dispatch('qa/updateQaDetailResult', data);

      if (resp.result === 'OK') {
        this.$message.success('测试项更新成功');
        this.refreshQaList();
      }
    },

    async batchDeleteQaDetail() {
      this.$confirm('此操作将永久删除选中的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            this.fullscreenLoading = true;
            var selectData = this.$refs.multipleTable.selection;
            if (selectData.length > 0) {
              for (var i in selectData) {
                await store.dispatch('qa/deleteQaDetail', selectData[i].id);
              }
              this.$message({
                message: '批量删除成功！',
                type: 'success'
              });
              this.refreshQaList();
            }
            this.fullscreenLoading = false;
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
    },

    async resultSubmit() {
      this.qahead.fstatus = '3';

      var args = { 'id': this.qahead.id, 'data': this.qahead }

      var resp = await store.dispatch('qa/updateQaHead', args);

      if (resp.result === 'OK') {
        this.$message.success('测试结果提交成功');
        this.refreshQaList();
      }
    },

    async resultRollback() {
      this.qahead.fstatus = '2';
      var args = { 'id': this.qahead.id, 'data': this.qahead }
      var resp = await store.dispatch('qa/updateQaHead', args);

      if (resp.result === 'OK') {
        this.$message.success('测试结果撤回成功');
        this.refreshQaList();
      }
    },

    async getQaHead() {
      var resp = await store.dispatch('qa/getQaHead', this.id);
      this.qahead = resp.data;
    },

    async refreshQaList() {
      var args = { id: this.id, class1: this.class1, class2: this.class2 };
      await store.dispatch('qa/refreshPclListViaClass', args);
      await store.dispatch('qa/refreshPclTargetActual', this.id)
    }
  }
};
</script>

<style scoped>
.div-container {
  padding: 8px 32px 8px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.goTop {
  height: calc(100vh - 70px);
  overflow-x: hidden;
}

.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}

.row-top {
  margin-top: 10px;
}

.card-shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}
</style>
