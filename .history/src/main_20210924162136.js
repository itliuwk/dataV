import Vue from 'vue'
import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import echarts from 'echarts'
import './assets/common.less'

Vue.use(dataV)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
