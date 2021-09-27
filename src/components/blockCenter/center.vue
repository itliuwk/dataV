<template>
  <div id="center">
    <div class="title">
      <p>营收结构</p>
      <div class="tips">
        <select
          aria-checked="1"
          class="left-select"
          @change="selChange($event)"
        >
          <option value="3" selected>月度营收</option>
          <option value="2">季度营收</option>
          <option value="1">年度营收</option>
        </select>
      </div>
    </div>
    <div id="myChartCenter" :style="{ width: '550px', height: '350px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      selVal: 3
    }
  },
  mounted () {},
  methods: {
    selChange (e) {
      this.$emit('centerChange', e.target.value)
    },

    drawLine (revenueStructure, prevFilter, nextFilter) {
      let myChart = this.$echarts.init(document.getElementById('myChartCenter'))
      let xData = revenueStructure[0].map(item => item.busSeg)
      let prev = revenueStructure[0].map(item =>
        parseInt(item.revenueRatio * 100)
      )
      let curr = revenueStructure[1].map(item =>
        parseInt(item.revenueRatio * 100)
      )
      let prevName = prevFilter
      let currName = nextFilter
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
          data: [prevName, currName],
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
            name: prevName,
            type: 'bar',
            data: prev,
            itemStyle: {
              color: '#147EE1'
            }
          },
          {
            name: currName,
            type: 'bar',
            data: curr,
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
