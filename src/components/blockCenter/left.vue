<template>
  <div id="left">
    <div class="title">
      <p>营收情况</p>
      <div class="tips">
        <span>近两年实际+本年预算，营收同比折现</span>
        <select class="left-select">
          <option value="3">月度营收</option>
          <option selected value="2">季度营收</option>
          <option value="1">年度营收</option>
        </select>
      </div>
    </div>
    <div id="myChart" :style="{ width: '500px', height: '350px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'left',
  data () {
    return {}
  },
  mounted () {
    window.addEventListener('resize', this.chartssize)
    let cHeight = document.querySelector('.block-center').offsetHeight
    let titHeight = document.querySelector('.title').offsetHeight
    document.querySelector('#myChart').style.height = cHeight - titHeight + 'px'
    this.chartssize()
  },
  methods: {
    chartssize () {
      this.myChart && this.myChart.resize()
      !this.myChart && this.drawLine()
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              width: 0,
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
          data: ['t2020', 't2021', 'ys2021'],
          orient: 'vertical',
          left: 'center',
          bottom: 'bottom'
        },
        xAxis: [
          {
            type: 'category',
            data: ['Q1', 'Q2', 'Q3', 'Q4'],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: {
          axisLine: {
            show: false
          },
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
            data: [32.6, 220.0, 126.4, 123.2, 25.6, 76.7, 135.6],
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: 't2021',
            type: 'bar',
            data: [232.2, 248.7, 328.8, 126.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#28A855'
            }
          },
          {
            name: 'ys2021',
            type: 'bar',
            data: [120.7, 225.6, 228.2, 126.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#D5B119'
            }
          },
          {
            name: 'zhexian',
            type: 'line',
            data: [15.3, 23.4, 223.0, 104.5, 6.3, 100.2, 20.3, 6.2],
            itemStyle: {
              color: '#33FFFF'
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
#left {
  width: 30%;
  box-sizing: border-box;
  padding-right: 30px;
  .title {
    .left-select {
      margin-left: 10px;
    }
    p {
      padding-left: 20px;
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
