<template>
  <div class="div-container">
    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h4 style="margin:0 auto;">测试对象：{{ qahead.fobjectid }}</h4>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-top">
      <el-col :span="24">
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
              @click="resultSubmit()"
            >提交结果</el-button>
            <el-button
              v-show="isCanRollback()"
              @click="resultRollback()"
            >结果撤回</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="qa_pcl_class1_list"
      tooltip-effect="dark"
      border
      size="medium"
      class="row-top"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column
        prop="fclass1"
        sortable
        label="分类1"
        width="400"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openClass2(scope.row.fclass1)"
          >{{ scope.row.fclass1 }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="class2_cnt" label="分类2数量" width="150" />
      <el-table-column prop="test_cnt" label="测试用例数量" width="150" />
      <el-table-column prop="tested_cnt" label="已经测试数量" width="150" />
      <el-table-column prop="ng" label="未处理NG数量" width="150" />
      <el-table-column prop="canceled_cnt" label="取消数量" width="150" />
    </el-table>
    <QaSingleNewForPcl ref="QaSingleNewForPcl" />
    <QaBatchNewForPcl ref="QaBatchNewForPcl" />
  </div>
</template>

<script>
import QaPclTargetActual from '@/views/qa/components/QaPclTargetActual';
import QaSingleNewForPcl from '@/views/qa/components/QaSingleNewForPcl';
import QaBatchNewForPcl from '@/views/qa/components/QaBatchNewForPcl';
import store from '@/store';
import { mapGetters } from 'vuex';
import { getPclDetailViaClass } from '@/api/qa';
export default {
  components: {
    QaPclTargetActual,
    QaSingleNewForPcl,
    QaBatchNewForPcl
  },
  data() {
    return {
      qaheadId: '',
      qahead: {},
      fullscreenLoading: false,
      multipleSelection: []
    };
  },
  computed: {
    ...mapGetters(['qa_pcl_class1_list'])
  },
  created: async function() {
    this.qaheadId = this.$route.query.qahf_id;
    this.refreshPclQaClass1()
    this.getQaHead()
  },

  methods: {
    isCanAdd() {
      if (this.qahead.fstatus === '1' || this.qahead.fstatus === '2') {
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

      for (var i in this.qa_pcl_class1_list) {
        if (!this.qa_pcl_class1_list[i].fresult) {
          return false;
        }
        if (this.qa_pcl_class1_list[i].fresult === 'NG') {
          return false;
        }
      }
      return true;
    },

    isCanBatchDelete() {
      if ((this.qahead.fstatus === '1') & (this.qa_pcl_class1_list.length > 0)) {
        var seleted = this.$refs.multipleTable.selection
        if (seleted.length > 0) {
          return false;
        }
        return true;
      }
      return true;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    openClass2(class1) {
      this.$router.push({
        name: 'TaskPclTestClass2',
        query: {
          qahf_id: this.qaheadId,
          class1: class1
        }
      });
    },

    async getQaHead() {
      var resp = await store.dispatch('qa/getQaHead', this.qaheadId);
      this.qahead = resp.data;
    },

    async refreshPclQaClass1() {
      await store.dispatch('qa/refreshPclQaClass1', this.qaheadId);
    },

    singleAdd() {
      this.$refs.QaSingleNewForPcl.handleDialog(this.qahead.id);
    },

    batchAdd() {
      this.$refs.QaBatchNewForPcl.handleDialog(this.qahead.id);
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
                var resp_head = await getPclDetailViaClass(
                  this.qahead.id,
                  selectData[i].fclass1,
                  ''
                );

                for (var j in resp_head.data) {
                  var qadf = resp_head.data[j].id;
                  await store.dispatch('qa/deleteQaDetail', qadf);
                }
              }
              this.$message({
                message: '批量删除成功！',
                type: 'success'
              });
              this.refreshPclQaClass1()
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
    }
  }
};
</script>

<style lang="scss" scoped>
.div-container {
  padding: 8px 32px 8px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
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
</style>
