<template>
  <div id="data-view">
    // eslint-disable-next-line vue/valid-v-bind
    <dv-full-screen-container :style="{ height: clientHeight + 'px' }">
      <top-header />
      <div class="main-content">
        <div class="block-top">
          <div class="block-top-left">
            <p>
              <span>2021年累计营收</span>
              <span>1235万元</span>
              <span>预算完成率98%</span>
            </p>
          </div>
          <div class="block-top-right">
            <p>
              <span>2021年累计利润</span>
              <span>1235万元</span>
              <span>预算完成率89%</span>
            </p>
          </div>
        </div>
        <div class="block-center">
          <BlockCenter />
        </div>
        <div class="block-bottom"></div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
import BlockCenter from './blockCenter/index.vue'

export default {
  name: 'DataView',
  components: {
    topHeader,
    BlockCenter
  },
  data () {
    return {
      clientHeight: 1080
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
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
