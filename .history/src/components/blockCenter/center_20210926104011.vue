<template>
  <div id="center">
    <div class="title">
      <p>营收结构</p>
      <div class="tips">
        <select aria-checked="1" class="left-select">
          <option value="0">月度营收</option>
          <option value="1">季度营收</option>
          <option value="2">年度营收</option>
        </select>
      </div>
    </div>
    <div id="myChartCenter" :style="{ width: '500px', height: '350px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {}
  },
  mounted () {
    window.addEventListener('resize', this.chartssize)
    this.chartssize()
  },
  methods: {
    chartssize () {
      let cHeight = document.querySelector('.block-center').offsetHeight
      let titHeight = document.querySelector('.title').offsetHeight
      document.querySelector('#myChartCenter').style.height =
        cHeight - titHeight + 'px'
      this.myChart && this.myChart.resize()
      !this.myChart && this.drawLine()
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('myChartCenter'))
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
          right: 0
        },
        legend: {
          data: ['t2020', 't2021'],
          orient: 'vertical',
          left: 'center',
          bottom: 'bottom'
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '星乐度',
              '希尔顿',
              '文传中心',
              '户外公共教育',
              '好玩横琴巴士',
              '文旅展示中心'
            ]
          }
        ],
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 't2020',
            type: 'bar',
            data: [
              32.6,
              20.0,
              6.4,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4
            ],
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: 't2021',
            type: 'bar',
            data: [
              182.2,
              48.7,
              18.8,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0
            ],
            itemStyle: {
              color: '#28A855'
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
#center {
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
