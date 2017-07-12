import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/About.vue'
import Home from '../components/Home.vue'
import Demo from '../components/Demo.vue'
import PhotoWall from '../components/PhotoWall.vue'
import Posts from '../components/Posts.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '', component: Home },
    { path: '/Home', component: Home },
    { path: '/Demo', component: Demo },
    { path: '/About', component: About },
    { path: '/PhotoWall', component: PhotoWall },
    { path: '/Posts', component: Posts }
  ]
})
