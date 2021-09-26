<template>
  <div id="rose-chart">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script>
import Left from './blockCenter/left'
import Center from './blockCenter/center'
import Right from './blockCenter/right'
export default {
  name: 'RoseChart',
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
