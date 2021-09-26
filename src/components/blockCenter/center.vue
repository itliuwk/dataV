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
import { getRevenueStructure } from '../../api/index'
export default {
  name: 'center',
  data () {
    return {
      selVal: 3
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.getRevenueStructure(this.selVal)
    })
    this.getRevenueStructure()
  },
  methods: {
    selChange (e) {
      this.getRevenueStructure(e.target.value)
      this.selVal = e.target.value
    },
    // 营收结构
    getRevenueStructure (type = 3) {
      let cHeight = document.querySelector('.block-center').offsetHeight
      let titHeight = document.querySelector('.title').offsetHeight
      document.querySelector('#myChartCenter').style.height =
        cHeight - titHeight + 'px'

      let year = this.$dayjs().year()
      let month = this.$dayjs().month()
      getRevenueStructure({
        type,
        month: month + 1,
        // quarter: '',
        year
      }).then(res => {
        if (res.msg === 'ok') {
          let prevFilter = ''
          let nextFilter = ''
          // 年度
          if (type == 1) {
            prevFilter = this.$dayjs().year() - 1
            nextFilter = this.$dayjs().year()
          }
          // 季度
          if (type == 2) {
            prevFilter = this.$dayjs().year() - 1
            nextFilter = this.$dayjs().year()
          }

          // 月度
          if (type == 3) {
            // 逻辑：判断月份是否等于1月份  等于1月份的话  prev需要取上一年的12月份
            // dayjs 的月份 默认 是 0开始
            month = month + 1
            let obj = {
              year: month === 1 ? year - 1 : year,
              month: month < 10 ? '0' + (month - 1) : month.toString()
            }
            prevFilter = obj.year + (obj.month === '00' ? '12' : obj.month)
            nextFilter = year + (month < 10 ? '0' + month : month.toString())
          }

          let payload = (res && res.payload) || ''
          if (!payload) return
          let prev = payload
            .filter(item => item.monthKey == prevFilter)
            .sort((a, b) => a.busSeg.charCodeAt() - b.busSeg.charCodeAt())

          let curr = payload
            .filter(item => item.monthKey == nextFilter)
            .sort((a, b) => a.busSeg.charCodeAt() - b.busSeg.charCodeAt())
          let revenueStructure = [prev, curr]
          console.log('revenueStructure: ', revenueStructure)

          this.myChart && this.myChart.resize()
          this.drawLine(revenueStructure, prevFilter, nextFilter)
        }
      })
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
      let prevName = 't' + prevFilter
      let currName = 't' + nextFilter
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
