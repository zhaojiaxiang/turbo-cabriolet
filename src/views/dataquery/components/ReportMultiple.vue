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
        <el-tooltip
          class="item"
          effect="dark"
          content="自定义当前报表标题"
          placement="bottom"
        >
          <el-input v-model="title" clearable placeholder="自定义报表标题" style="margin-left:10px; width:200px" />
        </el-tooltip>

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
          <h4> {{ title }}</h4>
        </div>

        <div
          v-for="(order, index) in orderData"
          :key="index"
          class="page_break"
        >
          <el-table
            :data="order.liaison"
            border
            style="width: 100%; margin-top:20px"
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

          <div v-for="(qa, index2) in order.qa" :key="index2">
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
              <DisplayEditor :contenttext="item.content_text" />
            </div>
          </div>
          <el-divider />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getReportOrderInfo } from '@/api/query';
import DisplayEditor from '@/views/common/DisplayEditor';
export default {
  components: {
    DisplayEditor
  },
  data() {
    return {
      title: '单体测试计划书兼报告书',
      order_no: '',
      multiple_slip: '',
      fullscreenLoading: false,
      is_imagemode: false,
      is_bigscreen: false,
      el_col_span_1: 4,
      el_col_span_2: 15,
      orderData: [],
      qaData: []
    };
  },
  watch: {
    async is_imagemode(newval) {
      var resp_liaison;
      if (newval) {
        this.fullscreenLoading = true;
        resp_liaison = await getReportOrderInfo(
          this.order_no,
          this.multiple_slip,
          'Y'
        )
        this.orderData = resp_liaison.data;

        this.fullscreenLoading = false;
      } else {
        this.fullscreenLoading = true;
        resp_liaison = await getReportOrderInfo(
          this.order_no,
          this.multiple_slip,
          'N'
        )
        this.orderData = resp_liaison.data;
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
    var clientHeight = window.screen.height;
    if (clientHeight < 1080) {
      this.el_col_span_1 = 1;
      this.el_col_span_2 = 21;
    }
    this.fullscreenLoading = true;
    this.order_no = this.$route.query.order_no;
    this.multiple_slip = this.$route.query.multiple_slip;
    if (!this.multiple_slip) {
      this.multiple_slip = '';
    }
    var resp_liaison = await getReportOrderInfo(
      this.order_no,
      this.multiple_slip,
      'N'
    )
    this.orderData = resp_liaison.data;
    this.fullscreenLoading = false;
  },
  methods: {

    printdiv() {
      var newstr = document.getElementById('div_print').innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      this.refreshView()
      location.reload();
      return false;
    },

    refreshView() {
      this.$router.push({
        path: '/query/report'
      })
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
.page_break {
  /* 实现打印PDF时分页
    在调用window.print()时，可以实现打印效果，但内容太多时要进行分页打印。
    在样式中有规定几个打印的样式
    page-break-before和page-break-after CSS属性并不会修改网页在屏幕上的显示，这两个属性是用来控制文件的打印方式。
    每个打印属性都可以设定4种设定值：auto、always、left和right。其中Auto是默认值，只有在有需要时，才需设定分页符号 (Page breaks)。
    page-break-before若设定成always，则是在遇到特定的组件时，打印机会重新开始一个新的打印页。
    page-break-before若设定成left，则会插入分页符号，直到指定的组件出现在一个左边的空白页上。
    page-break-before若设定成right，则会插入分页符号，直到指定的组件出现在一个右边的空白页上。
    page-break-after属性会将分页符号加在指定组件后，而非之前。
     */
  page-break-after: always;
}

@media print {
  @page {
    /* 横向 */
    size: A3;

    /* 边距 上右下左 */
    margin: 0;
  }
  body {
    margin: 2cm;
  }

}

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
