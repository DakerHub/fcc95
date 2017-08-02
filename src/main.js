// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router/index.js'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'       // https://github.com/vuejs/vue-touch/releases/tag/2.0.0-beta.1

import 'element-ui/lib/theme-default/index.css'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'
// import router from './router/index'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueLazyLoad)
Vue.use(VueTouch, { name: 'v-touch' })
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
