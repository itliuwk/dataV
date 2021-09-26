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
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.blockCenter {
  display: flex;
}
</style>
