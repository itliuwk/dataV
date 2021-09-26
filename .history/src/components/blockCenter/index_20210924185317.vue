<template>
  <div class="blockCenter">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script>
import Left from './left'
import Center from './center'
import Right from './right'
export default {
  name: 'index',
  components: {
    Left,
    Center,
    Right
  },
  data () {
    return {
      option: {}
    }
  },
  methods: {},
  mounted () {
    let offsetHeight = document.querySelector('.block-center').offsetHeight
    console.log('offsetHeight: ', offsetHeight);
  }
}
</script>

<style lang="less">
.blockCenter {
  display: flex;
}
</style>
