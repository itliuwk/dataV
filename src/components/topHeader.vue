<template>
  <div id="top-header">
    <dv-decoration-5 :dur="5" class="header-center-decoration" />
    <div class="center-title">泛旅游经济运行分析</div>
    <div class="full-screen" @click="opi">
      {{ isFullscreenForNoScroll ? '退出全屏' : '全屏' }}
    </div>
    <div class="full-date">
      <span class="time">{{ time }}</span>
      <span class="date">{{ date }}</span>
      <span class="week">{{ week }}</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import screenfull from 'screenfull'
import { isFullscreenForNoScroll } from '@/utils/index'
const DAY = {
  0: '星期日',
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
      time: dayjs().format('HH:mm:ss'),
      isFullscreenForNoScroll: isFullscreenForNoScroll()
    }
  },
  mounted () {
    window.addEventListener('resize', this.chartssize)
    window.addEventListener('keydown', this.keydown)

    setInterval(() => {
      this.time = dayjs().format('HH:mm:ss')
    }, 1000)
  },
  methods: {
    // 阻止F11默认事件
    keydown (event) {
      if (event.keyCode === 122) {
        event.preventDefault()
        event.returnValue = false
        this.toggle()
      }
    },
    chartssize () {
      let fullscreenForNoScroll = isFullscreenForNoScroll()
      this.isFullscreenForNoScroll = fullscreenForNoScroll
    },
    toggle () {
      if (!screenfull.isEnabled) {
        // 如果不支持进入全屏，发出不支持提示
        this.$message({
          message: '您的浏览器版本过低不支持全屏显示！',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    opi () {
      let fullscreenForNoScroll = isFullscreenForNoScroll()
      this.isFullscreenForNoScroll = fullscreenForNoScroll

      this.toggle()
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
