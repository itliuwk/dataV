<template>
  <div id="left">
    <div class="title">
      <p>营收情况</p>
      <div class="tips">
        <span>近两年实际+本年预算，营收同比折现</span>
        <select aria-checked="1" class="left-select">
          <option value="0">月度营收</option>
          <option value="1">季度营收</option>
          <option value="2">年度营收</option>
        </select>
      </div>
    </div>
    <div id="myChart" :style="{ width: '500px' }"></div>
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
      document.querySelector('#myChart').style.height =
        cHeight - titHeight + 'px'
      this.drawLine()
    },
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
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
          data: ['t2020', 't2021', 'ys2021'],
          orient: 'vertical',
          left: 'center',
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
            data: [32.6, 20.0, 6.4, 23.2, 25.6, 76.7, 135.6],
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: 't2021',
            type: 'bar',
            data: [182.2, 48.7, 18.8, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#28A855'
            }
          },
          {
            name: 'ys2021',
            type: 'bar',
            data: [70.7, 175.6, 182.2, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              color: '#D5B119'
            }
          },
          {
            name: 'zhexian',
            type: 'line',
            data: [20.3, 23.4, 23.0, 4.5, 6.3, 10.2, 20.3, 6.2],
            itemStyle: {
              color: '#fff'
            }
          }
        ]
      })
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
