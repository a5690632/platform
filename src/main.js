import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import "./api/index"
import "./permission.js"
import '@/styles/index.scss' // global css
import 'lib-flexible'
import "./directive/index"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
 
}).$mount('#app')
