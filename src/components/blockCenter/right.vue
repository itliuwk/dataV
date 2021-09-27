<template>
  <div id="right">
    <div class="title">
      <p>客流情况</p>
      <div class="tips">
        <span>本月总客流累计</span>
        <span class="num">{{ passengerFlow }} 人</span>
        <select class="left-select" @change="selChange($event)">
          <option value="1">2021环比</option>
          <option value="2">各利润中心</option>
        </select>
      </div>
    </div>
    <div
      v-show="selVal == 1"
      id="myChartRight"
      :style="{ width: '800px', height: '350px' }"
    ></div>
    <div
      v-show="selVal == 2"
      id="myChartRightProfit"
      :style="{ width: '800px', height: '350px' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'right',
  data () {
    return {
      passengerFlow: 0,
      selVal: 1
    }
  },
  mounted () {},
  methods: {
    selChange (e) {
      this.selVal = e.target.value
      this.$emit('rightChange', e.target.value)
    },
    // 环比
    drawRingRatio (prev, curr, passengerFlow = 0) {
      this.passengerFlow = passengerFlow
      let myChart = this.$echarts.init(document.getElementById('myChartRight'))
      let year = this.$dayjs().year()
      let prefix = ''
      let legendData = [prefix + (year - 1), prefix + year]
      let prevData = prev.map(item => parseInt(item.passengerCompare * 100))
      let currData = curr.map(item => parseInt(item.passengerCompare * 100))

      let xData = [
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

      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          data: legendData,
          orient: 'vertical',
          left: 'center',
          bottom: 'bottom'
        },
        grid: {
          top: '20'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: 'value',
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
            name: prefix + (year - 1),
            type: 'line',
            stack: 'Total',
            data: prevData,
            itemStyle: {
              color: '#147EE1'
            },
            smooth: true
          },
          {
            name: prefix + year,
            type: 'line',
            stack: 'Total',
            data: currData,
            itemStyle: {
              color: '#28A855'
            },
            smooth: true
          }
        ]
      }
      myChart.setOption(option, true)
      this.myChart = myChart
    },
    // 利润中心
    drawProfitCenter (data, legendData) {
      let myChart = this.$echarts.init(
        document.getElementById('myChartRightProfit')
      )

      let xData = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]

      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          data: legendData,
          orient: 'vertical',
          left: 'center',
          bottom: 'bottom'
        },
        grid: {
          top: '20'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: 'value',
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
        series: data
      }
      myChart.setOption(option, true)
      this.myChart = myChart
    }
  }
}
</script>

<style lang="less">
#right {
  width: 40%;
  box-sizing: border-box;
  padding-right: 30px;
  .title {
    .left-select {
      margin-left: 10px;
    }
    p {
      padding-left: 50px;
      color: #41edfb;
      font-size: 16px;
    }
    .tips {
      text-align: right;
      font-size: 14px;
      .num {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
</style>
