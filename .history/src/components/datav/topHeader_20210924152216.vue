<template>
  <div id="top-header">
    <dv-decoration-5 class="header-center-decoration" />
    <div class="center-title">泛旅游经济运行分析</div>
    <div class="full-screen" @click="opi">全屏</div>
    <div class="full-date">{{ date }} {{ week }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
const DAY = {
  0: '星期天',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
}
export default {
  name: 'TopHeader',
  data () {
    return {
      date: dayjs().format('YYYY年MM月DD'),
      week: DAY[dayjs().get('day')],
      isFull: true
    }
  },
  mounted () {
    // 监听window是否全屏，并进行相应的操作,支持esc键退出
    window.onresize = function () {
      var isFull = !!(
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      ) //! document.webkitIsFullScreen都为true。因此用!!
      console.log('isFull: ', isFull);
      this.isFull = isFull
    }
  },
  methods: {
    opi () {
      this.isFull ? this.fullScreen() : this.exitFullscreen()
    },
    fullScreen () {
      var element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      }
    },

    // 退出全屏
    exitFullscreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }
}
</script>

<style lang="less">
#top-header {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  .header-center-decoration {
    width: 90%;
    height: 60px;
    margin-top: 30px;
  }

  .center-title {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
  }
  .full-date {
    position: absolute;
    top: 10px;
    left: 50px;
    color: #fff;
  }
  .full-screen {
    width: 50px;
    height: 25px;
    display: inline-block;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    line-height: 25px;
    text-align: center;
    background: #275379;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
  }
}
</style>
