<template>
  <div id="top-header">
    <dv-decoration-5 class="header-center-decoration" />
    <div class="center-title">泛旅游经济运行分析</div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader'
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
}
</style>
