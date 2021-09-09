<template>
  <div>
    <el-table
      :data="qa_list"
      border
      height="420"
      size="medium"
    >
      <el-table-column prop="fobjectid" sortable label="测试对象" min-width="400" />
      <el-table-column prop="fstatus" sortable label="状态" min-width="130">
        <template slot-scope="scope" sortable>
          <el-tag :type="scope.row.tagtype" disable-transitions>{{
            scope.row.fstatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ftesttyp" label="测试类型" min-width="120" />

      <el-table-column prop="ftestdte" sortable label="测试日期" min-width="150" />
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
          <el-link
            type="primary"
            size="medium"
            :underline="false"
            @click="addObjectSummary(scope.row.id)"
          >概要</el-link>
          <el-link
            style="margin-left: 10px"
            type="primary"
            size="medium"
            :underline="false"
            @click="addCodeReview(scope.row.fslipno, scope.row.fobjectid, scope.row.id)"
          >代码Review</el-link>
          <el-link
            style="margin-left: 10px"
            type="primary"
            size="medium"
            :underline="false"
            @click="openQaTestList(scope.row.id, scope.row.fobjectid)"
          >测试</el-link>
          <el-link
            v-show="scope.row.qadfcount === 0"
            style="margin-left: 10px"
            type="primary"
            :underline="false"
            icon="el-icon-delete"
            @click="deleteQaHead(scope.row.id, scope.row.fobjectid)"
          />
        </template>
      </el-table-column>
    </el-table>
    <QaObjectSummary ref="QaObjectSummary" />
    <QaCodeReview ref="QaCodeReview" :isdisable="isdisable" />
  </div>
</template>

<script>
import QaObjectSummary from '@/views/qa/components/QaObjectSummary';
import QaCodeReview from '@/views/qa/components/QaCodeReview';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  components: {
    QaObjectSummary,
    QaCodeReview
  },
  data() {
    return {
      isdisable: false
    };
  },
  computed: {
    ...mapGetters(['qa_list'])
  },
  created: async function() {
    this.refreshQaHead()
  },
  methods: {
    async refreshQaHead() {
      var slip_no = this.$route.query.slip_no;
      await store.dispatch('qa/getQaListBySlipNo', slip_no);
    },
    addObjectSummary(id) {
      this.$refs.QaObjectSummary.handleDialog(id);
    },

    addCodeReview(slipno, objectid, id) {
      this.$refs.QaCodeReview.handleDialog(slipno, objectid, id);
    },

    openQaTestList(id, obj) {
      this.$router.push({
        name: 'QAMclTestList',
        query: { qahf_id: id, object: obj }
      });
    },

    deleteQaHead(id, fobjectid) {
      this.$confirm('此操作将永久删除' + fobjectid + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            var resp = await store.dispatch('qa/deleteQaHead', id)
            if (resp.result === 'OK') {
              this.refreshQaHead();
              this.$message({
                message: fobjectid + '已经删除！',
                type: 'success'
              });
            } else {
              this.$message.error(fobjectid + '删除失败');
            }
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

<style></style>
