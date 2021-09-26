<template>
  <div>
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
  mounted () {}
}
</script>

<style lang="less"></style>
