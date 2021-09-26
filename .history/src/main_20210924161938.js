import Vue from 'vue'
import App from './App.vue'

import './assets/common.less'

import dataV from '@jiaminghi/data-view'

import echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(dataV)
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App)
}).$mount('#app')
