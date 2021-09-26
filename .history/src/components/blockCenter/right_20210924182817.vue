<template>
  <div id="right">
    <div class="title">
      <p>营收结构</p>
      <div class="tips">
        <span>本月总客流累计</span>
        <span class="num">12,345 人</span>
        <select aria-checked="1" class="left-select">
          <option value="0">月度营收</option>
          <option value="1">季度营收</option>
          <option value="2">年度营收</option>
        </select>
      </div>
    </div>
    <div id="myChartRight" :style="{ width: '800px', height: '350px' }"></div>
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
          top: 50,
          left: 0,
          right: 0
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
            show: false,
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
            data: [120, 132, 101, 134, 90, 230, 220, 182, 191, 234, 290, 330],
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: 't2021',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 120, 132, 101, 134, 90, 230],
            itemStyle: {
              color: '#28A855'
            }
          }
        ]
      })
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
