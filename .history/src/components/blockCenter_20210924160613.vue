<template>
  <div id="rose-chart">
    <Left />
  </div>
</template>

<script>
import Left from './blockCenter/left.vue'
export default {
  name: 'RoseChart',
  components: {
    Left
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
