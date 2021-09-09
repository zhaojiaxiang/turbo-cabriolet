<template>
  <div class="div-container">

    <el-row class="row-top">
      <el-col :span="24">
        <div style="text-align:left; " class="vertical">
          <h3 style="margin:0 auto;">待确认</h3>
        </div>
      </el-col>
    </el-row>

    <el-table :data="task_confirm" border size="medium">
      <el-table-column prop="ftesttyp" sortable label="测试类型" width="110" />
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

      <el-table-column label="设计Review" width="110">
        <template slot-scope="scope">
          <el-link
            v-show="scope.row.design_id"
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

      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <el-link
            style="margin-left:10px"
            type="primary"
            :underline="false"
            @click="openConfirmDetail(scope.row.qahf_id)"
          >确认</el-link>
        </template>
      </el-table-column>
    </el-table>
    <QaDesignReview ref="QaDesignReview" :isdisable="true" />
    <QaCodeReview ref="QaCodeReview" :isdisable="true" />
  </div>
</template>

<script>
import store from '@/store';
import QaDesignReview from '@/views/qa/components/QaDesignReview';
import QaCodeReview from '@/views/qa/components/QaCodeReview';
import { mapGetters } from 'vuex';
export default {
  components: {
    QaDesignReview,
    QaCodeReview
  },
  data() {
    return {
      order_filters: [],
      slip_filters: [],
      user_filters: []
    };
  },
  computed: {
    ...mapGetters(['task_confirm'])
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

    openConfirmDetail(id) {
      this.$router.push({
        name: 'TaskConfirmDetail',
        query: { qahf_id: id }
      });
    },

    openDesignReview(slipno) {
      this.$refs.QaDesignReview.handleDialog(slipno);
    },

    openCodeReview(slipno, objectid, id) {
      this.$refs.QaCodeReview.handleDialog(slipno, objectid, id);
    },

    async refreshTaskTest() {
      await store.dispatch('workbench/getMyConfirm')
      this.reloadData(this.task_confirm)
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
