<template>
  <div class="home">
    <div class="home-content">
      <el-carousel indicator-position="outside" :height="imgAutoHeight">
        <el-carousel-item v-for="item in recentPhotos" :key="item.name">
          <img :src="item.url" :alt="item.name" class="img">
        </el-carousel-item>
      </el-carousel>
      <h2 class="recent-post-title">最近文章：</h2>
      <article class="recentPost" v-for="(post,index) in recentPosts">
        <h3 class="post-title" @click="turnToPost(post.title)">{{post.title}} <a href="#" class="turn-to" @click.prevent="turnToPost(post.title)"><i class="el-icon-d-arrow-right"></i></a></h3>
        <div class="post-abstract">
          {{post.abstract}}
        </div>
        <div class="post-meta">
          <time class="post-meta-item"><i class="iconfont icon-timefull"></i>{{post.date}}</time>
          <div class="post-meta-item">
            <span v-for="tag in post.tags"><i class="iconfont icon-tag"></i>{{tag}}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'

  var loadResourceFinish = false

  export default {
    name: 'home',
    data () {
      return {
        recentPosts: [],
        recentPhotos: [],
        date: ''
      }
    },
    computed: {
      imgAutoHeight () {
        var wH = window.innerWidth
        var width = wH > 768 ? 300 : wH / 2
        return width + 'px'
      }
    },
    methods: {
      turnToPost (title) {
        console.log(title)
        this.$router.push({path: '/post/' + title})
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!loadResourceFinish) {
        Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/recentPosts').then(function (res) {
          var recentPosts = res.body
          Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/recentPhotos').then(function (res) {
            var recentPhotos = res.body
            next(function (vm) {
              vm.$parent.$refs.navMenu.activedIndex = '/home'
              // if (to.path.indexOf(originMenu) === -1 || to.path === '') {
              //   vm.$parent.$refs.navMenu.activedIndex = to.path
              // }
              for (let i = 0; i < recentPosts.length; i++) {
                vm.recentPosts.splice(0, 0, recentPosts[i])
              }
              for (let i = 0; i < recentPhotos.length; i++) {
                vm.recentPhotos.splice(0, 0, recentPhotos[i])
              }
            })
          })
        })
        loadResourceFinish = true
      } else {
        next(function (vm) {
          var originMenu = vm.$parent.$refs.navMenu.activedIndex
          if (to.path.indexOf(originMenu) === -1) {
            vm.$parent.$refs.navMenu.activedIndex = to.path
          }
        })
      }
    }
  }
</script>
<style scoped>
.img{
  width: 600px;
  margin: 0 auto;
}
.recent-post-title{
  overflow: hidden;
  font-size: 1.3em;
  background-color: #99A9BF;
  margin: 10px 0;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
}
.home{
  width: 100%;
  height: 100%;
}
.home-content{
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
}
.el-carousel{
  background-color: #1F2D3D;
  border-radius: 5px;
}
.el-carousel__container{
  background-color: #475669;
}
.el-carousel__item{
  display: flex;
  background-color: #99A9BF;
}
.recentPost{
  border: 2px dashed #99a9bf;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 14px;
  border-radius: 5px;
  color: #676767;
  background-color: #fff;
  transition: all .3s;
}
.recentPost:hover{
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  border-color: #1D8CE0;
}
.turn-to{
  color: #383737;
  position: absolute;
  right: 10px;
  opacity: 0;
  transition: all .5s ease;
}
.recentPost:hover .turn-to{
  right: 30px;
  opacity: 1;
  transition: all .5s ease;
}
.post-title{
  font-size: 1.2em;
  padding: 10px 0;
  position: relative;
  cursor: pointer;
  color: #383737;
}
.post-title:hover{
  text-decoration: underline;
}
.post-title::after{
  content: '';
  height: 1px;
  background-color: #ccc;
  display: block;
  margin-top: 5px;
}
.post-abstract::after{
  content: '';
  height: 1px;
  background-color: #ccc;
  display: block;
  margin-top: 10px;
}
.post-abstract p{
  text-indent: 2em;
}
.post-meta{
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.post-meta-item{
  margin-right: 20px;
}
@media screen and (max-width: 768px) {
.img{
  width: 100%;
  height: auto;
}
}
</style>
