<template>
  <div class="blockCenter">
    <Left ref="leftBlock" @leftChange="getRevenueSituation" />
    <Center ref="centerBlock" @centerChange="getRevenueStructure" />
    <Right ref="rightBlock" @rightChange="getRevenueStructureRight" />
  </div>
</template>

<script>
import Left from './left'
import Center from './center'
import Right from './right'
import {
  getRevenueSituation,
  getRevenueStructure,
  getCumulative,
  getPassengerFlow
} from '@/api/index'

export default {
  name: 'index',
  components: {
    Left,
    Center,
    Right
  },
  data () {
    return {
      leftVal: 2,
      centerVal: 3,
      rightVal: 1, //  1环比 2各利润中心
      ringRatio: []
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.init()
    })
    this.init()
  },
  methods: {
    init () {
      this.getRevenueSituation(this.leftVal)
      this.getRevenueStructure(this.centerVal)
      this.getRevenueStructureRight(this.rightVal)
    },
    // 营收情况
    getRevenueSituation (type = 2) {
      this.leftVal = type
      let cHeight = document.querySelector('.block-center').offsetHeight
      let titHeight = document.querySelector('.title').offsetHeight
      document.querySelector('#myChart').style.height =
        cHeight - titHeight + 'px'

      let year = this.$dayjs().year()

      getRevenueSituation({ type, year }).then(res => {
        let payload = (res && res.payload) || ''
        if (!payload) return
        let data = []

        payload.map(item => {
          item.responseDTOS.map(dItem => {
            data.push(dItem)
          })
          return item
        })

        // 上一年 actualRevenue
        let prev = data
          .filter(item => !item.monthKey.indexOf(year - 1))
          .sort((a, b) => a.busSeg.charCodeAt() - b.busSeg.charCodeAt())

        // 本年 actualRevenue
        let curr = data
          .filter(item => !item.monthKey.indexOf(year))
          .sort((a, b) => a.busSeg.charCodeAt() - b.busSeg.charCodeAt())
        this.$refs['leftBlock'].drawLine(prev, curr, type)
      })
    },
    // 营收结构
    getRevenueStructure (type = 3) {
      let cHeight = document.querySelector('.block-center').offsetHeight
      let titHeight = document.querySelector('.title').offsetHeight
      document.querySelector('#myChartCenter').style.height =
        cHeight - titHeight + 'px'

      let year = this.$dayjs().year()
      let month = this.$dayjs().month()
      let quarter = 1
      if ([1, 2, 3].includes(month + 1)) {
        quarter = 1
      }
      if ([4, 5, 6].includes(month + 1)) {
        quarter = 2
      }
      if ([7, 8, 9].includes(month + 1)) {
        quarter = 3
      }
      if ([10, 11, 12].includes(month + 1)) {
        quarter = 4
      }
      getRevenueStructure({
        type,
        month: month + 1,
        quarter,
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
            // 判断季度是否等于1  等于1的话  prev需要取上一年的季度
            // dayjs 的月份 默认 是 0开始
            let obj = {
              year: quarter === 1 ? year - 1 : year,
              month: quarter === 1 ? 4 : quarter - 1
            }
            prevFilter = obj.year + 'Q' + obj.month.toString()
            nextFilter = year + 'Q' + quarter
          }

          // 月度
          if (type == 3) {
            // 判断月份是否等于1月份  等于1月份的话  prev需要取上一年的12月份
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

          this.myChart && this.myChart.resize()
          this.$refs['centerBlock'].drawLine(
            revenueStructure,
            prevFilter,
            nextFilter
          )
        }
      })
    },
    // 本年环比 和 各利润中心
    getRevenueStructureRight (type) {
      this.rightVal = type
      let cHeight = document.querySelector('.block-center').offsetHeight
      let titHeight = document.querySelector('.title').offsetHeight

      if (type == 1) {
        document.querySelector('#myChartRight').style.height =
          cHeight - titHeight + 'px'
      } else {
        document.querySelector('#myChartRightProfit').style.height =
          cHeight - titHeight + 'px'
      }

      let year = this.$dayjs().year()
      let month = this.$dayjs().month()
      if (type == 2) {
        getPassengerFlow({ type: 3, year: this.$dayjs().year() }).then(res => {
          let payload = (res && res.payload) || ''
          if (!payload) return

          let busSegS = payload
            .filter(item => !item.monthKey.indexOf(year + '01'))
            .map(item => item.busSeg)
          let newData = []
          let colors = [
            '#B80320',
            '#D8DB09',
            '#A46FE1',
            '#D08527',
            '#4CBA96',
            '#4D7CDC',
            '#5D6983',
            '#282D38',
            '#512F4A',
            '#4E152D',
            '#2C0B0F'
          ]
          busSegS.map((bItem, idx) => {
            let data = payload
              .filter(item => item.busSeg == bItem)
              .sort((a, b) => a.monthKey - b.monthKey)
              .map(item => item.passengerFlow)
            newData.push({
              name: bItem,
              type: 'line',
              stack: 'Total',
              data,
              itemStyle: {
                color: colors[idx]
              },
              smooth: true
            })
            return bItem
          })
          this.$refs['rightBlock'].drawProfitCenter(newData, busSegS)
        })
        return
      }

      getRevenueSituation({ type: 3, year }).then(res => {
        let payload = (res && res.payload) || ''
        if (!payload) return
        let data = []

        payload.map(item => {
          item.responseDTOS.map(dItem => {
            data.push(dItem)
          })
          return item
        })

        // 上一年 actualRevenue
        let prev = data
          .filter(item => !item.monthKey.indexOf(year - 1))
          .sort((a, b) => a.busSeg.charCodeAt() - b.busSeg.charCodeAt())

        // 本年 actualRevenue
        let curr = data
          .filter(item => !item.monthKey.indexOf(year))
          .sort((a, b) => a.busSeg.charCodeAt() - b.busSeg.charCodeAt())

        getCumulative({
          busType: 1,
          monthKey: year + (month < 10 ? '0' + month : month.toString())
        }).then(res => {
          if (res.msg === 'ok') {
            let passengerFlow =
              (res && res.payload && res.payload[0]).passengerFlow || 0
            this.$refs['rightBlock'].drawRingRatio(prev, curr, passengerFlow)
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.blockCenter {
  display: flex;
}
</style>
