<template>
  <el-row>
    <el-col :span="el_col_span_1">
      <div class="grid-content" />
    </el-col>
    <el-col :span="el_col_span_2">
      <div
        style="padding-left:42px;padding-right:42px;margin-top:20px;margin-bottom:20px"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="当前是大屏模式，无法将界面所有数据都写入PDF"
          placement="bottom"
          :disabled="!is_bigscreen"
        >
          <el-button
            icon="el-icon-printer"
            @click="printdiv"
          >打印PDF</el-button>
        </el-tooltip>
        <el-button disabled icon="el-icon-download">保存Excel</el-button>

        <div style="float:right">
          <el-tooltip
            class="item"
            effect="dark"
            content="打印PDF时，建议使用默认模式。"
            placement="bottom"
          >
            <el-switch
              v-model="is_bigscreen"
              v-loading.fullscreen.lock="fullscreenLoading"
              style="margin-right:20px"
              active-text="大屏模式"
              inactive-text="默认"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="需要查看测试贴图数据时，使用贴图模式"
            placement="bottom"
          >
            <el-switch
              v-model="is_imagemode"
              v-loading.fullscreen.lock="fullscreenLoading"
              active-text="贴图模式"
              inactive-text="普通模式"
            />
          </el-tooltip>
        </div>
      </div>
      <div id="div_print" style="padding-left:42px;padding-right:42px">
        <div style="text-align:center">
          <h4>{{ title }}</h4>
        </div>

        <el-table
          v-if="liaison_show"
          :data="liaisonData"
          border
          style="width: 100%"
          :show-header="false"
          :span-method="liaisonSpanMethod"
          :cell-class-name="liaisonCellClass"
          size="medium"
        >
          <el-table-column prop="row_1" min-width="70" />
          <el-table-column prop="row_2" min-width="120" />
          <el-table-column prop="row_3" min-width="70" />
          <el-table-column prop="row_4" min-width="120" />
          <el-table-column prop="row_5" min-width="70" />
          <el-table-column prop="row_6" min-width="120" />
        </el-table>

        <div v-for="(qa, index) in qaData" :key="index">
          <el-table
            :data="qa.qa"
            border
            style="width: 100%; margin-top:20px"
            :show-header="false"
            :span-method="qaSpanMethod"
            :cell-class-name="qaCellClass"
            size="medium"
          >
            <el-table-column prop="row_1" min-width="60" />
            <el-table-column prop="row_2" min-width="120" />
            <el-table-column prop="row_3" min-width="60" />
            <el-table-column prop="row_4" min-width="120" />
            <el-table-column prop="row_5" min-width="60" />
            <el-table-column prop="row_6" min-width="80" />
          </el-table>

          <el-divider
            v-if="qa.image.length > 0"
            content-position="left"
          >贴图：</el-divider>
          <div
            v-for="(item, index1) in qa.image"
            :key="index1"
            style="margin-top: 10px"
          >
            <span>{{ index1 + 1 }} . {{ item.content }}</span>
            <DisplayEditor :content_text="item.content_text" />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  getReportLiaisonInfo,
  getReportQaInfo
} from '@/api/query';
import DisplayEditor from '@/views/common/DisplayEditor';
export default {
  components: {
    DisplayEditor
  },
  data() {
    return {
      title: '单体测试计划书兼报告书',
      slip_no: '',
      fullscreenLoading: false,
      is_imagemode: false,
      is_bigscreen: false,
      liaison_show: true,
      clientHeight: 1080,
      el_col_span_1: 4,
      el_col_span_2: 15,
      liaisonData: [],
      qaData: []
    };
  },
  watch: {
    async is_imagemode(newval) {
      var resp_qa;
      if (newval) {
        this.fullscreenLoading = true;
        resp_qa = await getReportQaInfo(this.slip_no, 'Y')
        this.qaData = resp_qa.data;
        this.fullscreenLoading = false;
      } else {
        this.fullscreenLoading = true;
        resp_qa = await getReportQaInfo(this.slip_no, 'N')
        this.qaData = resp_qa.data;
        this.fullscreenLoading = false;
      }
    },
    is_bigscreen(newval) {
      if (newval) {
        if (this.clientHeight < 1080) {
          this.el_col_span_1 = 0;
          this.el_col_span_2 = 24;
        } else {
          this.el_col_span_1 = 0;
          this.el_col_span_2 = 24;
        }
      } else {
        if (this.clientHeight < 1080) {
          this.el_col_span_1 = 1;
          this.el_col_span_2 = 21;
        } else {
          this.el_col_span_1 = 4;
          this.el_col_span_2 = 15;
        }
      }
    }
  },
  mounted: async function() {
    this.clientHeight = window.screen.height;
    if (this.clientHeight < 1080) {
      this.el_col_span_1 = 1;
      this.el_col_span_2 = 21;
    }
    this.fullscreenLoading = true;
    this.slip_no = this.$route.query.slipno;
    var resp_liaison = await getReportLiaisonInfo(this.slip_no)

    if (resp_liaison.data && JSON.stringify(resp_liaison.data) !== '{}') {
      this.liaisonData = resp_liaison.data;
    } else {
      this.title = '结合测试计划书';
      this.liaison_show = false;
    }

    var resp_qa = await getReportQaInfo(this.slip_no)
    this.qaData = resp_qa.data;
    this.fullscreenLoading = false;
  },
  methods: {
    printdiv() {
      var newstr = document.getElementById('div_print').innerHTML;
      // var oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      // document.body.innerHTML = oldstr;
      location.reload();
      return false;
    },

    liaisonCellClass({ columnIndex }) {
      if ((columnIndex === 0) | (columnIndex === 2) | (columnIndex === 4)) {
        return 'table_title_style';
      }
    },

    qaCellClass({ rowIndex, columnIndex }) {
      if (rowIndex < 2) {
        if ((columnIndex === 0) | (columnIndex === 2) | (columnIndex === 4)) {
          return 'table_title_style';
        }
      }
      if (rowIndex === 2) {
        return 'table_title_style';
      }
    },

    liaisonSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex > 0) {
        if ((rowIndex === 3) | (rowIndex === 4)) {
          return [1, 5];
        }
      }
    },

    qaSpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if ((columnIndex === 3) | (columnIndex === 4) | (columnIndex === 5)) {
          return [1, 3];
        }
      } else if (rowIndex > 1) {
        if (columnIndex === 1) {
          return [1, 3];
        }
      }
    }
  }
};
</script>
<style>
.table_title_style {
  background: #f6f5f5;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
