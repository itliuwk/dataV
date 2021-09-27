<template>
  <div id="left">
    <div class="title">
      <p>营收情况</p>
      <div class="tips">
        <span>近两年实际+本年预算，营收同比折现</span>
        <select class="left-select" @change="selChange($event)">
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
  mounted () {},
  methods: {
    selChange (e) {
      this.$emit('leftChange', e.target.value)
    },
    drawLine (prev, curr, type) {
      let year = this.$dayjs().year()
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let prefix = ''
      let legendData = [
        prefix + (year - 1),
        prefix + year,
        '预算' + year,
        '营收同比'
      ]
      let prevData = prev.map(item => item.actualRevenue)
      let currData = curr.map(item => item.actualRevenue)
      let ysData = curr.map(item => item.budgetRevenue)
      let zxData = curr.map(item => parseInt(item.revenueCompare * 100))
      let xObj = {
        1: ['year'],
        2: ['Q1', 'Q2', 'Q3', 'Q4'],
        3: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      }
      let xData = xObj[type]
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
          right: 35
        },
        legend: {
          data: legendData,
          orient: 'vertical',
          left: 'center',
          bottom: 'bottom'
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisPointer: {
              type: 'shadow'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: prefix + (year - 1),
            type: 'bar',
            data: prevData,
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: prefix + year,
            type: 'bar',
            data: currData,
            itemStyle: {
              color: '#28A855'
            }
          },
          {
            name: '预算' + year,
            type: 'bar',
            data: ysData,
            itemStyle: {
              color: '#D5B119'
            }
          },
          {
            name: '营收同比',
            type: 'line',
            yAxisIndex: 1,
            data: zxData,
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
