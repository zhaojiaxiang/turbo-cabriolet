<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">结合测试</h3>
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

    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';
export default {
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

    filterStatus(value, row) {
      return row.fstatus === value;
    }
  }
};
</script>

<style scoped>
.vertical {
  display: table-cell;
  color: #606266;
  height: 36px;
  vertical-align: middle;
}
</style>
