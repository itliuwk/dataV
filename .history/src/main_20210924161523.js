import Vue from 'vue'
import App from './App.vue'

import './assets/common.less'

import dataV from '@jiaminghi/data-view'

Vue.config.productionTip = false

Vue.use(dataV)

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar') // 柱状图
require('echarts/lib/chart/line')// 线型图
require('echarts/lib/chart/pie') // 饼图
require('echarts/lib/component/title') // 图表标题
require('echarts/lib/component/dataZoom')// dataZoom组件
require('echarts/lib/component/tooltip')// tooltip
require('echarts/lib/component/legend')// 图例
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App)
}).$mount('#app')
