<template>
  <div class="home">
    <div class="home-content">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in recentPhotos" :key="item.name">
          <img :src="item.url" alt="item.name" class="img">
        </el-carousel-item>
      </el-carousel>
      <h2 class="recent-post-title">最近文章：</h2>
      <article class="recentPost" v-for="(post,index) in recentPosts">
        <h3 class="post-title">{{post.title}} <a href="#" class="turn-to" @click.prevent="turnToPost(post.title)"><i class="el-icon-d-arrow-right"></i></a></h3>
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
  export default {
    name: 'home',
    data () {
      return {
        recentPosts: [
          {
            title: 'Vue官网教程学习-2',
            abstract: '1.模块化，需要require引用模块2.fs模块，支持本地文件操作。3.http模块，创建web服务器，以及创建客服端请求；',
            date: '2017/6/7',
            tags: ['前端', 'vue', 'Nodejs']
          },
          {
            title: 'Vue官网教程学习-1',
            abstract: '1.模块化，需要require引用模块2.fs模块，支持本地文件操作。3.http模块，创建web服务器，以及创建客服端请求；',
            date: '2017/6/7',
            tags: ['前端', 'vue', 'Nodejs']
          },
          {
            title: 'Vue官网教程学习-0',
            abstract: '1.模块化，需要require引用模块2.fs模块，支持本地文件操作。3.http模块，创建web服务器，以及创建客服端请求；',
            date: '2017/6/7',
            tags: ['前端', 'vue', 'Nodejs']
          }
        ],
        recentPhotos: [
          {
            name: 'a',
            url: 'http://ostjp7jb4.bkt.clouddn.com/17-7-12/12910508.jpg'
          },
          {
            name: 'b',
            url: 'http://ostjp7jb4.bkt.clouddn.com/17-7-12/2165555.jpg'
          },
          {
            name: 'd',
            url: 'http://ostjp7jb4.bkt.clouddn.com/17-7-12/89694588.jpg'
          },
          {
            name: 'c',
            url: 'http://ostjp7jb4.bkt.clouddn.com/17-7-12/67706257.jpg'
          }
        ]
      }
    },
    methods: {
      turnToPost (title) {
        console.log(title)
      }
    }
  }
</script>
<style>
.img{
  width: 100%;
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
  width: 600px;
  margin: 0 auto;
  padding: 10px 0;
}
.el-carousel{
  background-color: #023961;
  border-radius: 5px;
}
.el-carousel__item{
  background-color: #666;
}
.recentPost{
  border: thin solid #ccc;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 14px;
  border-radius: 5px;
  color: #676767;
  transition: all .2s;
}
.recentPost:hover{
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
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
  color: #383737;
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
</style>
