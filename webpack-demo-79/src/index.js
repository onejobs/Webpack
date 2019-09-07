// import "@babel/polyfill";
// 入口文件
import calc from './calc'

console.log('ok')

import './assets/css/index.css'

import './styles/index.less'

console.log(calc(10, 20))

import Vue from 'vue'
import App from '@/App'

new Vue({
  render: h => h(App)
}).$mount('#app')