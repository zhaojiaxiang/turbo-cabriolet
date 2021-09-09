<template>
  <div class="div-container">

    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">待审核</h3>
        </div>
      </el-col>
    </el-row>

    <el-table :data="task_approval" border size="medium">
      <el-table-column prop="ftesttyp" sortable label="测试类型" min-width="110" />
      <el-table-column
        prop="fodrno"
        label="订单号"
        width="100"
        :filters="order_filters"
        :filter-method="filterOrder"
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="fslipno"
        label="联络票/订单支号"
        width="180"
        :filters="slip_filters"
        :filter-method="filterSlip"
        filter-placement="bottom-end"
      />

      <el-table-column
        prop="fnote"
        label="订单备注"
        min-width="100"
        show-overflow-tooltip
      />

      <el-table-column prop="fsystemcd" label="系统名称" width="80" />

      <el-table-column prop="fprojectcd" label="项目名称" width="80" />

      <el-table-column
        prop="ftestusr"
        label="对应者"
        width="80"
        :filters="user_filters"
        :filter-method="filterUser"
        filter-placement="bottom-end"
      />

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

      <el-table-column
        prop="fobjectid"
        label="测试对象"
        min-width="150"
        show-overflow-tooltip
      />

      <el-table-column
        prop="fobjmodification"
        label="概要"
        min-width="150"
        show-overflow-tooltip
      />

      <el-table-column label="操作" min-width="40" fixed="right">
        <template slot-scope="scope">
          <el-link
            style="margin-left:10px"
            type="primary"
            :underline="false"
            @click="openApprovalDetail(scope.row.qahf_id)"
          >审核</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      order_filters: [],
      slip_filters: [],
      user_filters: []
    };
  },
  computed: {
    ...mapGetters(['task_approval'])
  },
  created: async function() {
    this.refreshTaskTest();
  },
  methods: {
    filterStatus(value, row) {
      return row.fstatus === value;
    },

    filterUser(value, row) {
      return row.ftestusr === value;
    },

    filterSlip(value, row) {
      return row.fslipno === value;
    },

    filterOrder(value, row) {
      return row.fodrno === value;
    },

    openApprovalDetail(id) {
      this.$router.push({
        name: 'TaskApprovalDetail',
        query: { qahf_id: id }
      });
    },

    async refreshTaskTest() {
      await store.dispatch('workbench/getMyApproval')
      this.reloadData(this.task_approval)
    },

    reloadData(taskData) {
      for (var i in taskData) {
        var isSlipExisted = false;
        var isUserExisted = false;
        var isOrderExisted = false;
        var slip_json = {};
        var user_json = {};
        var order_json = {};

        if (taskData[i].fstatus === '1') {
          taskData[i].fstatus = '初始';
          taskData[i].tagtype = 'info';
        } else if (taskData[i].fstatus === '2') {
          taskData[i].fstatus = '已审核';
          taskData[i].tagtype = '';
        } else if (taskData[i].fstatus === '3') {
          taskData[i].fstatus = '已提交';
          taskData[i].tagtype = 'warning';
        } else if (taskData[i].fstatus === '4') {
          taskData[i].fstatus = '已确认';
          taskData[i].tagtype = 'success';
        }

        slip_json.text = taskData[i].fslipno;
        slip_json.value = taskData[i].fslipno;

        user_json.text = taskData[i].ftestusr;
        user_json.value = taskData[i].ftestusr;

        order_json.text = taskData[i].fodrno;
        order_json.value = taskData[i].fodrno;

        for (var j in this.slip_filters) {
          if (this.slip_filters[j].text === taskData[i].fslipno) {
            isSlipExisted = true;
            continue;
          }
        }

        if (!isSlipExisted) {
          this.slip_filters.push(slip_json);
        }

        for (var k in this.user_filters) {
          if (this.user_filters[k].text === taskData[i].ftestusr) {
            isUserExisted = true;
            continue;
          }
        }

        if (!isUserExisted) {
          this.user_filters.push(user_json);
        }

        for (var l in this.order_filters) {
          if (this.order_filters[l].text === taskData[i].fodrno) {
            isOrderExisted = true;
            continue;
          }
        }

        if (!isOrderExisted) {
          this.order_filters.push(order_json);
        }
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
</style>
