<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import resize from './mixins/resize';

import { projectBugRate } from '@/api/dashboard';

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      data: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(this.$el, 'macarons');

      var resp = await projectBugRate()
      this.data = resp.data

      this.chart.setOption({
        title: {
          text: '最近六个月项目测试Bug率%(当前权限下)'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.data.project,
          orient: 'vertical',
          right: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.month
        },
        yAxis: {
          type: 'value'
        },
        series: this.data.series
      });
    }
  }
};
</script>
