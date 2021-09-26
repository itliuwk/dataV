<template>
  <div id="top-header">
    <dv-decoration-5 class="header-center-decoration" />
    <div class="center-title">泛旅游经济运行分析</div>
    <div class="full-screen" @click="opi">全屏</div>
    <div class="full-date">
      <span class="time">{{ time }}</span>
      <span class="date">{{ date }}</span>
      <span class="week">{{ week }}</span>
    </div>
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
      isFull: true,
      time: dayjs().format('HH:mm:ss')
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keydown)
    window.addEventListener('resize', this.onResize)
    setInterval(() => {
      this.time = dayjs().format('HH:mm:ss')
    }, 1000)
  },
  methods: {
    onResize () {
      console.log('[ 123 ] >', 123)
    },
    // 阻止F11默认事件
    keydown (event) {
      if (event.keyCode === 122) {
        event.preventDefault()
        event.returnValue = false
      }
    },
    opi () {
      var isFull = !!(
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      )
      !isFull ? this.fullScreen() : this.exitFullscreen()
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
    left: 60px;
    color: #fff;
    .time {
      margin-right: 30px;
      font-size: 18px;
    }
    .week {
      margin-left: 10px;
    }
  }
  .full-screen {
    padding: 5px 15px;
    display: inline-block;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 40px;
    background: #275379;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
  }
}
</style>
