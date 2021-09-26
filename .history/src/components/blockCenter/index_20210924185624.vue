<template>
  <div class="blockCenter">
    <Left :cHeight="cHeight" />
    <Center :cHeight="cHeight" />
    <Right :cHeight="cHeight" />
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
      cHeight: ''
    }
  },
  methods: {},
  mounted () {
    let cHeight = document.querySelector('.block-center').offsetHeight
    this.cHeight = cHeight
  }
}
</script>

<style lang="less">
.blockCenter {
  display: flex;
}
</style>
