import './css/style.scss'
import bird from '@/images/bird.jpg'
import favicon from './images/favicon.png'
import Vue from 'vue'
import App from './components/App.vue'
import { add } from './js/b'
import $ from 'jquery'

console.log(bird)
console.log(favicon)
console.log(process.env.NODE_ENV)
console.log(Array.from([...[1, 3, 5]]))
console.log($)
console.log(add(5, 3))
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App)
})
