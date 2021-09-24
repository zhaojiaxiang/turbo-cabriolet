<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { liaisonTypePowerScale } from '@/api/dashboard';

const animationDuration = 6000

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
      liaison: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      var resp = await liaisonTypePowerScale()
      this.liaison = resp.data

      this.chart.setOption({
        title: {
          text: '最近六个月项目工时(当前权限下)',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.liaison.project,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        legend: {
          data: ['运用维护', '维护阶段障碍', '追加开发'],
          orient: 'vertical',
          right: 0
        },
        series: [{
          name: '运用维护',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.liaison.req,
          animationDuration
        }, {
          name: '维护阶段障碍',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.liaison.bug,
          animationDuration
        },
        {
          name: '追加开发',
          type: 'bar',
          stack: 'vistors',
          barWidth: '40%',
          data: this.liaison.develop,
          animationDuration
        }]
      })
    }
  }
}
</script>
