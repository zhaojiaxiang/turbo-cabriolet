<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="text-align: right">
          <el-button @click="openTestStatistics">测试数据统计</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      border
      :data="project_mcl_list"
      style="width: 100%"
      :span-method="arraySpanMethod"
      size="medium"
      class="card-shadow"
    >
      <el-table-column
        prop="slip_status"
        label="状态"
        fixed
        width="80"
        :filters="slip_status_filters"
        :filter-method="filterSlipStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :class="statusTagClass(scope.row.slip_status)"
            disable-transitions
          >{{ scope.row.slip_status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="slip_slip"
        label="联络票号"
        min-width="150"
        :filters="slip_slip_filters"
        :filter-method="filterSlipNo"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>开发概要: {{ scope.row.slip_brief }}</p>
            <p>问题描述: {{ scope.row.slip_content }}</p>
            <p>问题分析: {{ scope.row.slip_analyse }}</p>
            <p>解决方案: {{ scope.row.slip_solution }}</p>
            <p>计划工时: {{ scope.row.slip_plnmanpower }}</p>
            <p>实际工时: {{ scope.row.slip_actmanpower }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.slip_slip }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="slip_assignedto"
        label="对应者"
        min-width="80"
        :filters="slip_assigned_to_filters"
        :filter-method="filterSlipAssignedto"
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="slip_brief"
        label="详情"
        min-width="250"
        show-overflow-tooltip
      />
      <el-table-column prop="design_id" label="设计Review" min-width="100">
        <template slot-scope="scope">
          <el-link
            v-show="designShow(scope.row.slip_type, scope.row.design_id)"
            :type="linkStyle(scope.row.design_id)"
            :underline="false"
            @click="openDesignReview(scope.row.slip_slip)"
          >设计Review</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="slip_plan" label="计划" width="210" />
      <el-table-column prop="slip_actual" label="实际" width="210" />
      <el-table-column prop="slip_release" label="发布" width="100" />
      <el-table-column
        prop="qa_object"
        label="测试对象"
        min-width="180"
        fixed="right"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="openQaList(scope.row.qa_id)"
          >{{ scope.row.qa_object }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="qa_status"
        label="状态"
        width="80"
        fixed="right"
        :filters="qa_status_filters"
        :filter-method="filterQAStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.qa_tagtype" disable-transitions>{{
            scope.row.qa_status
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        prop="qa_modification"
        label="概要"
        min-width="60"
      >
        <template slot-scope="scope">
          <el-link
            v-show="scope.row.qa_modification"
            type="primary"
            :underline="false"
            @click="openObjectSummary(scope.row.qa_id)"
          >概要</el-link>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="code_id"
        label="代码Review"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-link
            :underline="false"
            :type="linkStyle(scope.row.code_id)"
            @click="openCodeReview(scope.row.slip_slip, scope.row.qa_object)"
          >代码Review</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- <QaObjectSummary
      ref="QaObjectSummary"
      :isdisable="isdisable"
    />

    <QaDesignReview
      ref="QaDesignReview"
      :isdisable="isdisable"
    />
    <QaCodeReview ref="QaCodeReview" :isdisable="isdisable" />
    <TestDataStatistics ref="TestDataStatistics" /> -->
    <ProjectMclDataStatistics ref="ProjectMclDataStatistics" />
  </div>
</template>

<script>
// import QaObjectSummary from './../../Home/components/QaObjectSummary';
// import QaDesignReview from './../../Home/components/QaDesignReview';
// import QaCodeReview from './../../Home/components/QaCodeReview';
import ProjectMclDataStatistics from './ProjectMclDataStatistics';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  components: {
    ProjectMclDataStatistics
    // QaObjectSummary,
    // QaDesignReview,
    // QaCodeReview,
    // TestDataStatistics
  },
  data() {
    return {
      order_no: '',
      isdisable: false
    };
  },
  computed: {
    ...mapGetters(['project_mcl_list', 'slip_status_filters', 'qa_status_filters', 'slip_slip_filters', 'slip_assigned_to_filters', 'span_list'])
  },
  mounted: async function() {
    this.order_no = this.$route.query.order_no;
    await store.dispatch('projects/getProjectMclList', this.order_no)
  },
  methods: {
    openTestStatistics() {
      this.$refs.ProjectMclDataStatistics.handleDialog(this.order_no);
    },

    linkStyle(id) {
      if (id) {
        return 'success';
      } else {
        return 'danger';
      }
    },

    designShow(type, id) {
      if (type === '追加开发') {
        return true;
      } else {
        if (id) {
          return true;
        }
      }
      return false;
    },

    arraySpanMethod({ rowIndex, columnIndex }) {
      // 合并的列数
      if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5 ||
        columnIndex === 6 ||
        columnIndex === 7
      ) {
        const _row = this.span_list[rowIndex]; // 从处理完的数组里获取
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col // 相当于给给表格加上rowspan,colspan属性
        };
      }
    },

    filterSlipStatus(value, row) {
      return row.slip_status === value;
    },

    filterQAStatus(value, row) {
      return row.qa_status === value;
    },

    filterSlipNo(value, row) {
      return row.slip_slip === value;
    },

    filterSlipAssignedto(value, row) {
      return row.slip_assignedto === value;
    },

    openObjectSummary(id) {
      this.$refs.QaObjectSummary.handleDialog(id);
    },

    openDesignReview(slipno) {
      this.$refs.QaDesignReview.handleDialog(slipno);
    },

    openCodeReview(slipno, objectid) {
      this.$refs.QaCodeReview.handleDialog(slipno, objectid);
    },

    openQaList(qahf_id) {
      this.$router.push({
        name: 'ProjectOverviewQA',
        query: { qahf_id: qahf_id }
      });
    },

    statusTagClass(status) {
      if (status === '待办') {
        return 'status-1';
      } else if (status === '进行中') {
        return 'status-2';
      } else if (status === '已完成') {
        return 'status-3';
      } else {
        return 'status-4';
      }
    }
  }
};
</script>

<style scoped>
.status-1 {
  background-color: #fbe6d4;
  border-color: #fbe6d4;
  color: #ffa931;
}
.status-2 {
  background-color: #fecb89;
  border-color: #fecb89;
  color: #fff;
}
.status-3 {
  background-color: #ffa931;
  color: #fff;
  border-color: #ffa931;
}
.status-4 {
  background-color: #b9ac92;
  border-color: #b9ac92;
  color: #fff;
}
.card-shadow {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}
</style>
