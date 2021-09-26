<template>
  <div id="data-view">
    <ScreenAdapter>
      <top-header />
      <div class="main-content">
        <div class="block-top">
          <div class="block-top-left">
            <p>
              <span>{{ year }}年累计营收</span>
              <span>{{ cumulative.actualRevenue }}万元</span>
              <span
                >预算完成率{{
                  parseInt(cumulative.revenueBudgetRate * 100)
                }}%</span
              >
            </p>
          </div>
          <div class="block-top-right">
            <p>
              <span>{{ year }}年累计利润</span>
              <span>{{ cumulative.actualProfit }}万元</span>
              <span
                >预算完成率{{
                  parseInt(cumulative.revenueProfitRate * 100)
                }}%</span
              >
            </p>
          </div>
        </div>
        <template>
          <div class="block-center">
            <BlockCenter />
          </div>
          <div class="block-bottom">
            <BlockBottom />
          </div>
        </template>
      </div>
    </ScreenAdapter>
  </div>
</template>

<script>
import {
  getRevenueSituation,
  getPassengerFlow,
  getCumulative
} from '../api/index'
import dayjs from 'dayjs'
import topHeader from './topHeader'
import BlockCenter from './blockCenter/index'
import BlockBottom from './blockBottom'
import ScreenAdapter from './ScreenAdapter'

export default {
  name: 'DataView',
  components: {
    ScreenAdapter,
    topHeader,
    BlockCenter,
    BlockBottom
  },
  data () {
    return {
      clientHeight: document.body.clientHeight,
      clientWidth: document.body.clientWidth,
      cumulative: {},
      revenueStructure: [],
      year: dayjs().year()
    }
  },
  mounted () {
    // window.addEventListener('resize', this.onResize)
    // setTimeout(() => {
    //   this.onResize()
    // }, 1000)
    this.getInit()
  },
  methods: {
    getInit () {
      this.getCumulative()
      this.getRevenueSituation()
      this.getPassengerFlow()
    },
    //  累计 利润 营收
    getCumulative () {
      getCumulative({ busType: 1, monthKey: dayjs().year() }).then(res => {
        console.log('[ getCumulative ] >', res)
        if (res.msg === 'ok') {
          this.cumulative = (res && res.payload && res.payload[0]) || {}
        }
      })
    },

    // 营收情况
    getRevenueSituation () {
      getRevenueSituation({ type: 2, year: dayjs().year() }).then(res => {
        console.log('res: ', res)
      })
    },
    // 客流情况 -- 各利润中心
    getPassengerFlow () {
      getPassengerFlow({ type: 2, year: dayjs().year() }).then(res => {
        console.log('res: ', res)
      })
    },
    onResize () {
      this.clientHeight = document.body.clientHeight
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #011238;
  color: #fff;

  #dv-full-screen-container {
    // background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    .block-top {
      height: 10%;
      display: flex;
      .block-top-left,
      .block-top-right {
        flex: 1;
        text-align: center;

        p {
          border: 1px solid #ddd;
          display: inline-block;
          border-radius: 5px;
          text-indent: 2em;

          span {
            margin-right: 30px;
            font-size: 30px;
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }
    .block-center {
      height: 30%;
    }
    .block-bottom {
      height: 60%;
    }
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
