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
    { path: '/home', component: Home },
    { path: '/demo', component: Demo },
    { path: '/about', component: About },
    { path: '/photoWall', component: PhotoWall },
    { path: '/posts', component: Posts }
  ]
})
