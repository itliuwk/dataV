<template>
  <div
    id="bottom"
    :style="{ paddingTop: isFullscreenForNoScroll ? '100px' : '' }"
  >
    <div class="title">
      <p>各中心预算完成情况</p>
    </div>
    <div
      id="myChartBottom"
      :style="{
        width: '1800px',
        height: isFullscreenForNoScroll ? '390px' : '380px'
      }"
    ></div>
  </div>
</template>

<script>
import { isFullscreenForNoScroll } from '../utils/index'
export default {
  name: 'hello',
  data () {
    return {
      isFullscreenForNoScroll: false
    }
  },
  mounted () {
    window.addEventListener('resize', this.chartssize)
    this.drawLine()
  },
  methods: {
    chartssize () {
      this.isFullscreenForNoScroll = isFullscreenForNoScroll()
      this.myChart && this.myChart.resize()
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('myChartBottom'))
      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#fff'
            }
          }
        },
        textStyle: {
          color: '#fff'
        },
        grid: {
          top: '20',
          left: 0,
          right: 0
        },
        legend: {
          data: [
            '星乐度',
            '希尔顿',
            '文传中心',
            '户外公共教育',
            '好玩横琴巴士',
            '文旅展示中心'
          ],
          orient: 'vertical',
          left: 'left',
          bottom: 'bottom'
        },
        xAxis: [
          {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: {
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '星乐度',
            type: 'bar',
            data: [32.6, 20.0, 6.4, 23.2, 25.6, 76.7, 135.6],
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: '希尔顿',
            type: 'bar',
            data: [182.2, 48.7, 18.8, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#28A855'
            }
          },
          {
            name: '文传中心',
            type: 'bar',
            data: [70.7, 175.6, 182.2, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#D5B119'
            }
          },
          {
            name: '户外公共教育',
            type: 'bar',
            data: [20.3, 23.4, 23.0, 4.5, 6.3, 10.2, 20.3, 6.2],
            itemStyle: {
              color: '#fff'
            }
          },
          {
            name: '好玩横琴巴士',
            type: 'bar',
            data: [182.2, 48.7, 18.8, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#28A855'
            }
          },
          {
            name: '文旅展示中心',
            type: 'bar',
            data: [70.7, 175.6, 182.2, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#D5B119'
            }
          }
        ]
      }
      myChart.setOption(option, true)
      this.myChart = myChart
    }
  }
}
</script>

<style lang="less">
#bottom {
  width: 30%;
  box-sizing: border-box;
  padding-right: 30px;
  .title {
    .left-select {
      margin-left: 10px;
    }
    p {
      color: #41edfb;
      font-size: 16px;
    }
    .tips {
      text-align: right;
      font-size: 14px;
    }
  }
}
</style>
