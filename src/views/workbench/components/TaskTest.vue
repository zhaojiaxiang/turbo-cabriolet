<template>
  <div class="div-container">

    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">结合测试</h3>
        </div>
      </el-col>
    </el-row>

    <el-table :data="task_test_pcl" border size="medium">
      <el-table-column prop="ftesttyp" label="测试类型" width="80" />
      <el-table-column
        prop="fodrno"
        label="订单号"
        width="100"
        :filters="pcl_order_filters"
        :filter-method="filterOrder"
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="fslipno"
        label="订单支号"
        width="180"
        :filters="pcl_slip_filters"
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
        :filters="pcl_user_filters"
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
      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-link
            style="margin-left:10px"
            type="primary"
            :underline="false"
            @click="openTaskPclClass1(scope.row.qahf_id)"
          >测试</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">单体测试</h3>
        </div>
      </el-col>
    </el-row>

    <el-table :data="task_test_mcl" border size="medium">
      <el-table-column prop="ftesttyp" label="测试类型" width="80" />
      <el-table-column
        prop="fodrno"
        label="订单号"
        width="100"
        :filters="mcl_order_filters"
        :filter-method="filterOrder"
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="fslipno"
        label="联络票"
        width="180"
        :filters="mcl_slip_filters"
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
        :filters="mcl_user_filters"
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
        label="概要"
        width="110"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            size="medium"
            :underline="false"
            @click="addObjectSummary(scope.row.qahf_id)"
          >概要</el-link>
        </template>
      </el-table-column>

      <el-table-column label="设计Review" width="110">
        <template slot-scope="scope">
          <el-link
            style="margin-left:10px"
            type="primary"
            :underline="false"
            @click="openDesignReview(scope.row.fslipno)"
          >设计Review</el-link>
        </template>
      </el-table-column>

      <el-table-column label="代码Review" width="110">
        <template slot-scope="scope">
          <el-link
            v-show="scope.row.code_id"
            style="margin-left:10px"
            type="primary"
            :underline="false"
            @click="openCodeReview(scope.row.fslipno, scope.row.fobjectid, scope.row.qahf_id)"
          >代码Review</el-link>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-link
            style="margin-left:10px"
            type="primary"
            :underline="false"
            @click="openTaskMclList(scope.row.qahf_id, scope.row.fobjectid)"
          >测试</el-link>
        </template>
      </el-table-column>
    </el-table>
    <QaObjectSummary ref="QaObjectSummary" />
    <QaDesignReview ref="QaDesignReview" :isdisable="false" />
    <QaCodeReview ref="QaCodeReview" :isdisable="false" />
  </div>
</template>

<script>
import QaDesignReview from '@/views/qa/components/QaDesignReview';
import QaCodeReview from '@/views/qa/components/QaCodeReview';
import QaObjectSummary from '@/views/qa/components/QaObjectSummary';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  components: {
    QaDesignReview,
    QaCodeReview,
    QaObjectSummary
  },
  data() {
    return {
      mcl_user_filters: [],
      mcl_slip_filters: [],
      mcl_order_filters: [],
      pcl_user_filters: [],
      pcl_slip_filters: [],
      pcl_order_filters: []
    };
  },
  computed: {
    ...mapGetters(['task_test_mcl', 'task_test_pcl'])
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

    openTaskPclClass1(id) {
      this.$router.push({
        name: 'TaskPclTestClass1',
        query: { qahf_id: id }
      });
    },

    openTaskMclList(id, obj) {
      this.$router.push({
        name: 'QAMclTestList',
        query: { qahf_id: id, object: obj }
      });
    },

    openDesignReview(slipno) {
      this.$refs.QaDesignReview.handleDialog(slipno);
    },

    openCodeReview(slipno, objectid, id) {
      this.$refs.QaCodeReview.handleDialog(slipno, objectid, id);
    },

    addObjectSummary(id) {
      this.$refs.QaObjectSummary.handleDialog(id);
    },

    async refreshTaskTest() {
      await store.dispatch('workbench/getMyMCL')
      await store.dispatch('workbench/getMyPCL')
      this.reloadMclData(this.task_test_mcl)
      this.reloadPclData(this.task_test_pcl)
    },

    async reloadMclData(taskData) {
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

        for (var j in this.mcl_slip_filters) {
          if (this.mcl_slip_filters[j].text === taskData[i].fslipno) {
            isSlipExisted = true;
            continue;
          }
        }

        if (!isSlipExisted) {
          this.mcl_slip_filters.push(slip_json);
        }

        for (var k in this.mcl_user_filters) {
          if (this.mcl_user_filters[k].text === taskData[i].ftestusr) {
            isUserExisted = true;
            continue;
          }
        }

        if (!isUserExisted) {
          this.mcl_user_filters.push(user_json);
        }

        for (var l in this.mcl_order_filters) {
          if (this.mcl_order_filters[l].text === taskData[i].fodrno) {
            isOrderExisted = true;
            continue;
          }
        }

        if (!isOrderExisted) {
          this.mcl_order_filters.push(order_json);
        }
      }
    },
    async reloadPclData(taskData) {
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

        for (var j in this.pcl_slip_filters) {
          if (this.pcl_slip_filters[j].text === taskData[i].fslipno) {
            isSlipExisted = true;
            continue;
          }
        }

        if (!isSlipExisted) {
          this.pcl_slip_filters.push(slip_json);
        }

        for (var k in this.pcl_user_filters) {
          if (this.pcl_user_filters[k].text === taskData[i].ftestusr) {
            isUserExisted = true;
            continue;
          }
        }

        if (!isUserExisted) {
          this.pcl_user_filters.push(user_json);
        }

        for (var l in this.pcl_order_filters) {
          if (this.pcl_order_filters[l].text === taskData[i].fodrno) {
            isOrderExisted = true;
            continue;
          }
        }

        if (!isOrderExisted) {
          this.pcl_order_filters.push(order_json);
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
