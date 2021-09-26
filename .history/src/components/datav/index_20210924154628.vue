<template>
  <div id="data-view">
    <dv-full-screen-container>
      <top-header />

      <!-- <div class="main-content">
        <digital-flop />

        <div class="block-left-right-content">
          <ranking-board />

          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <rose-chart />

              <water-level-chart />

              <scroll-board />
            </div>

            <cards />
          </div>
        </div>
      </div> -->

      <div class="main-content">
        <div class="block-top">
          <div class="block-top-left">
            <span>2021年累计营收</span>
            <span>1235万元</span>
            <span>预算完成率98%</span>
          </div>
          <div class="block-top-right">
            <span>2021年累计利润</span>
            <span>1235万元</span>
            <span>预算完成率89%</span>
          </div>
        </div>
        <div class="block-center"></div>
        <div class="block-bottom"></div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
import digitalFlop from './digitalFlop'
import rankingBoard from './rankingBoard'
import roseChart from './roseChart'
import waterLevelChart from './waterLevelChart'
import scrollBoard from './scrollBoard'
import cards from './cards'

export default {
  name: 'DataView',
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .block-top {
      height: 10%;
      display: flex;
      .block-top-left,
      .block-top-right {
        flex: 1;
        span {
          margin-right: 30px;
          font-size: 30px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .block-center {
      height: 45%;
    }
    .block-bottom {
      height: 45%;
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
