import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/About.vue'
import Home from '../components/Home.vue'
import Demo from '../components/Demo.vue'
import DemoList from '../components/DemoList.vue'
import DemoDetail from '../components/DemoDetail.vue'
import PhotoWall from '../components/PhotoWall.vue'
import Posts from '../components/Posts.vue'
import Post from '../components/Post.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '', component: Home },
    { path: '/home', component: Home },
    { path: '/demo',
      component: Demo,
      children: [
        {path: '', component: DemoList},
        {path: 'demoList', component: DemoList},
        {path: 'demoDetail/:title', component: DemoDetail}
      ]
    },
    { path: '/about', component: About },
    { path: '/photoWall', component: PhotoWall },
    { path: '/posts',
      component: Posts
    },
    { path: '/post/:id', component: Post }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
