<template>
  <div>
    <el-row class="row-bottom">
      <el-col :xs="24" :sm="24" :lg="24">
        <QaMclTargetActual />
      </el-col>
    </el-row>
    <el-row class="row-bottom">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          type="danger"
          plain
          :disabled="isCanBatchDelete()"
          @click="batchDeleteQaDetail()"
        >删除选中项</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="text-align: right;">
          <el-button-group>
            <el-button
              v-show="isCanDefaultOK()"
              plain
              @click="defaultOK()"
            >Default OK</el-button>
            <el-button plain @click="detailModify()">修改明细</el-button>
            <el-button
              v-show="isCanAdd()"
              plain
              @click="singleAdd()"
            >逐条添加</el-button>
            <el-button
              v-show="isCanAdd()"
              plain
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
      :data="qa_mcl_list"
      tooltip-effect="dark"
      border
      size="medium"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column
        prop="fsortrule"
        label="排序"
        min-width="70"
        show-overflow-tooltip
      />
      <el-table-column
        prop="fclass1"
        label="分类"
        min-width="100"
        sortable
        show-overflow-tooltip
      />
      <el-table-column prop="fregression" sortable label="回归？" min-width="90">
        <template slot-scope="scope">
          <el-tag :type="regressionTag" disable-transitions>{{
            scope.row.fregression
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fapproval" sortable label="状态" width="80" />
      <el-table-column prop="fcontent" sortable label="测试用例" min-width="700" />
      <el-table-column prop="ftestdte" label="测试日" min-width="100" />
      <el-table-column prop="ftestusr" label="测试者" min-width="90" />
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
      <el-table-column label="贴图" fixed="right" width="100">
        <template slot-scope="scope">
          <el-link
            v-if="isCanImage(scope.row.test_tag)"
            type="primary"
            :underline="false"
            style="margin-left: 15px"
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
            style="margin-left: 15px"
            @click="singleModify(scope.row.id)"
          />
          <el-link
            v-show="isCanEdit(scope.row)"
            style="margin-left: 20px"
            type="primary"
            :underline="false"
            icon="el-icon-delete"
            @click="singleDelete(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <el-pagination
          background
          :current-page="qa_mcl_current_page"
          :page-sizes="[15, 20, 30, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="qa_mcl_count"
          @size-change="handleSizeChange"
          @current-change="handlePage"
        />
      </el-col>
    </el-row>
    <QaSingleNew ref="QaSingleNew" />
    <QaSingleModify ref="QaSingleModify" />
    <QaBatchNew ref="QaBatchNew" />
    <QaModifyDetail ref="QaModifyDetail" />
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import QaMclTargetActual from './QaMclTargetActual';
import QaSingleNew from './QaSingleNew';
import QaSingleModify from './QaSingleModify';
import QaBatchNew from './QaBatchNew';
import QaModifyDetail from './QaModifyDetail';
export default {
  components: {
    QaMclTargetActual,
    QaSingleNew,
    QaSingleModify,
    QaBatchNew,
    QaModifyDetail
  },
  data() {
    return {
      qahf_id: 0,
      qahead: {},
      loading: false,
      paramtype: '',
      parentroute: '',
      fullscreenLoading: false,
      regressionTag: '',
      approvalTag: '',
      multipleSelection: []
    };
  },
  computed: {
    ...mapGetters(['qa_mcl_list', 'qa_mcl_current_page', 'qa_mcl_count'])
  },
  created() {
    this.qahf_id = this.$route.query.qahf_id;
    this.getQaHead()
    this.getQaDetailByQaHeadViaPagination();
  },
  methods: {
    handlePage(page) {
      store.commit('qa/SET_CURRENT_PAGE', page);
      this.getQaDetailByQaHeadViaPagination();
    },

    handleSizeChange(size) {
      store.commit('qa/SET_PAGE_SIZE', size);
      this.getQaDetailByQaHeadViaPagination();
    },
    async getQaDetailByQaHeadViaPagination() {
      await store.dispatch('qa/getQaDetailByQaHeadViaPagination', this.qahf_id);
    },
    async getQaHead() {
      var resp = await store.dispatch('qa/getQaHead', this.qahf_id);
      this.qahead = resp.data;
    },
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

    isCanDefaultOK() {
      if (this.qahead.fstatus === '2') {
        return true;
      } else {
        return false;
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

    isCanRollback() {
      if (this.qahead.fstatus === '3') {
        return true;
      }
      return false;
    },

    isCanBatchDelete() {
      if ((this.qahead.fstatus === '1') & (this.qa_mcl_list.length > 0)) {
        var seleted = this.$refs.multipleTable.selection
        if (seleted.length > 0) {
          return false;
        }
        return true;
      }
      return true;
    },

    isCanSubmit() {
      if (
        this.qahead.fstatus === '3' ||
        this.qahead.fstatus === '4' ||
        this.qahead.fstatus === '1'
      ) {
        return false;
      }

      for (var i in this.qa_mcl_list) {
        if (!this.qa_mcl_list[i].fresult) {
          return false;
        }
        if (this.qa_mcl_list[i].fresult === 'NG') {
          return false;
        }
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
              this.getQaDetailByQaHeadViaPagination();
              this.$message({
                message: '批量删除成功！',
                type: 'success'
              });
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
      var review_data = { 'object_id': this.qahead.fobjectid, 'slip_no': this.qahead.fslipno }
      var review_resp = await store.dispatch('qa/codeReviewInspection', review_data)

      if (review_resp.result === 'NG') {
        this.$confirm('Code ReView没有填写，是否继续提交！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            this.qahead.fstatus = '3';
            var data = { id: this.qahead.id, data: this.qahead };
            var resp = await store.dispatch('qa/updateQaHead', data);
            if (resp.result === 'OK') {
              this.$message.success('测试结果提交成功');
            } else {
              this.qahead.fstatus = '2';
              return;
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          });
      } else {
        this.qahead.fstatus = '3';
        var data = { id: this.qahead.id, data: this.qahead };
        var resp = await store.dispatch('qa/updateQaHead', data);
        if (resp.result === 'OK') {
          this.$message.success('测试结果提交成功');
        } else {
          this.qahead.fstatus = '2';
          return;
        }
      }
    },

    async resultRollback() {
      this.qahead.fstatus = '2';
      var data = { id: this.qahead.id, data: this.qahead };
      var resp = await store.dispatch('qa/updateQaHead', data);
      if (resp.result === 'OK') {
        this.$message.success('测试结果撤回成功');
      } else {
        this.qahead.fstatus = '2';
        return;
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
      var data = { 'id': qadetail_id, 'data': qadetailInfo }
      var resp = await store.dispatch('qa/updateQaDetailResult', data)

      if (resp.result === 'OK') {
        this.$message.success('测试项更新成功');
        this.getQaDetailByQaHeadViaPagination();
      }
    },

    filterResult(value, row) {
      return row.fresult === value;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    singleAdd() {
      this.$refs.QaSingleNew.handleDialog(this.qahead.id);
    },

    batchAdd() {
      this.$refs.QaBatchNew.handleDialog(this.qahead.id);
    },

    singleModify(id) {
      this.$refs.QaSingleModify.handleDialog(id);
    },

    detailModify() {
      this.$refs.QaModifyDetail.handleDialog(this.qahead.id);
    },
    async singleDelete(id) {
      var resp = await store.dispatch('qa/deleteQaDetail', id);

      if (resp.result === 'OK') {
        this.getQaDetailByQaHeadViaPagination();
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      }
    },

    async defaultOK() {
      var resp = await store.dispatch('qa/putDefaultOK', this.qahead.id)
      if (resp.result === 'OK') {
        this.getQaDetailByQaHeadViaPagination()
      }
    }
  }
};
</script>

<style scoped>
.row-bottom {
  margin-bottom:8px;
}
</style>
