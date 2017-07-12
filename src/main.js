// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router/index.js'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
// import router from './router/index'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app></app>',
  components: {
    App
  }
})
