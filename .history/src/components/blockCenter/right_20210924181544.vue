<template>
  <div id="left">
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
    <div id="myChartRight" :style="{ width: '600px', height: '350px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {}
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('myChartRight'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          data: ['t2020', 't2021'],
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
          data: [
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
        },
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
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 220, 182, 191, 234, 290, 330]
          },
          {
            name: 't2021',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 120, 132, 101, 134, 90, 230]
          }
        ]
      })
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
