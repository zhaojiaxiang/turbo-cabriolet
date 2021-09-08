<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="text-align:right;">
          <el-button
            v-show="isCanAddPCL"
            plain
            @click="openPCLNew"
          >新建结合测试</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="project_pcl_list" border size="medium">
      <el-table-column prop="fslipno" label="订单号" width="200" />

      <el-table-column prop="fslipno2" label="订单支号" width="100" />

      <el-table-column
        prop="fstatus"
        label="状态"
        width="100"
        :filters="[
          { text: '初始', value: '初始' },
          { text: '已审核', value: '已审核' },
          { text: '已提交', value: '已提交' },
          { text: '已确认', value: '已确认' }
        ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.tagtype" disable-transitions>{{
            scope.row.fstatus
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="测试对象" min-width="200">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openQaTestList(scope.row.id)"
          >{{ scope.row.fobjectid }}</el-link>
        </template>
      </el-table-column>

      <el-table-column prop="fcreateusr" label="创建者" width="100" />

      <el-table-column prop="ftestusr" label="测试者" width="100" />

      <el-table-column prop="qadfcount" label="测试项数量" width="100" />

      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-link
            v-show="scope.row.qadfcount === 0"
            type="primary"
            :underline="false"
            icon="el-icon-edit-outline"
            @click="openPclModify(scope.row.id)"
          />
          <el-link
            v-show="scope.row.qadfcount === 0"
            style="margin-left:20px"
            type="primary"
            :underline="false"
            icon="el-icon-delete"
            @click="deleteQaHead(scope.row.id, scope.row.fobjectid)"
          />
        </template>
      </el-table-column>
    </el-table>
    <ProjectPclNew
      ref="ProjectPclNew"
    />

    <ProjectPclModify
      ref="ProjectPclModify"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import ProjectPclNew from './ProjectPclNew';
import ProjectPclModify from './ProjectPclModify';
export default {
  components: {
    ProjectPclNew,
    ProjectPclModify
  },
  data() {
    return {
      loading: false,
      order_no: '',
      any_qahf_id: '',
      order_info: {}
    };
  },
  computed: {
    ...mapGetters(['project_pcl_list'])
  },
  mounted: async function() {
    this.loading = true;
    this.order_no = this.$route.query.order_no;
    const { data } = await store.dispatch('projects/getProjectPclList', this.order_no)
    this.any_qahf_id = data[data.length - 1].id
    this.loading = false;
  },
  methods: {
    openQaTestList(id) {
      this.$router.push({
        name: 'ProjectPclQaClass1',
        query: { qahf_id: id }
      });
    },

    openPclModify(id) {
      this.$refs.ProjectPclModify.handleDialog(id);
    },

    openPCLNew() {
      this.$refs.ProjectPclNew.handleDialog(this.any_qahf_id);
    },

    isCanAddPCL() {
      if (this.order_info.status === 4) {
        return false;
      }
      return true;
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
              await store.dispatch('projects/getProjectPclList', this.order_no)
              this.$message({
                message: fobjectid + '已经删除！',
                type: 'success'
              });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
    },

    filterStatus(value, row) {
      return row.fstatus === value;
    }
  }
};
</script>

<style></style>
