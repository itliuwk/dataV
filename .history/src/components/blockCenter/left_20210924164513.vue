<template>
  <div id="left">
    <div class="title">
      <p>营收情况</p>
      <div>
        <span>近两年实际+本年预算，营收同比折现</span>
      </div>
    </div>
    <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      console.log('this.$echarts: ', this.$echarts)
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
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
  .title {
    p {
      color: #41edfb;
    }
  }
}
</style>
