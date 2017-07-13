<template>
  <div class="posts-wp">
    <div class="breadcrumb-wp">
      <span>当前位置：</span>
      <el-breadcrumb>
        <el-breadcrumb-item>
          文章
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          文章列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="post-filter-slider" :class="filterShow?'':'hidden'">
      <div class="post-filter-wp">
        <div class="post-filter">
          <div class="filter-time">
            <span class="filter-time-title">时间段：</span>
            <el-radio-group v-model="filter.timeDuration" @change="showData" size="small">
              <el-radio :label="7">最近一周</el-radio>
              <el-radio :label="30">最近一个月</el-radio>
              <el-radio :label="90">最近三个月</el-radio>
              <el-radio :label="365">最近一年</el-radio>
              <el-radio :label="'all'">全部</el-radio>
            </el-radio-group>
          </div>
          <div class="filter-tags">
            <span>标&nbsp;&nbsp;&nbsp;&nbsp;签：</span>
            <el-checkbox-group v-model="filter.tags" class="tags-wp" @change="showData">
              <el-checkbox :label="tag" v-for="tag in totalTags">{{tag}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="filter-order">
            <el-radio-group v-model="filter.order" @change="showData">
              <el-radio :label="'desc'">降序</el-radio>
              <el-radio :label="'asc'">升序</el-radio>
            </el-radio-group>
          </div>
          <el-button>筛选</el-button>
        </div>
      </div>
      <div class="fliter-close" @click="toggleFilterShow">
        <i :class="filterShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        <span class="close-text" v-show="!filterShow">展开筛选条件</span>
        <span class="close-text" v-show="filterShow">隐藏筛选条件</span>
      </div>
    </div>
    <div class="post-list" :class="filterShow?'':'translateUp'">
      <div class="post-wp" v-for="post in posts">
        <article class="post-upper">
          <div class="post-brief">
            <h2 class="post-title"><a href="#">{{post.title}}</a></h2>
            <div class="post-abstract">
              <p>{{post.abstract}}</p>
            </div>
          </div>
          <div class="post-poster">
            <img :src="post.poster.url" alt="">
          </div>
        </article>
        <div class="post-meta post-lower">
          <time><i class="iconfont icon-timefull"></i>{{post.meta.time}}</time>
          <div class="tags">
            <span v-for="tag in post.meta.tags"><i class="iconfont icon-tag"></i>{{tag}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  const totalTags = ['Vue1', 'JS1', 'node1', 'css1', 'html1', 'JS2', 'node2', 'css2', 'html2', 'JS3', 'node3', 'css3', 'html3', 'node3', 'css3', 'html3']

  export default {
    name: 'posts',
    data () {
      return {
        isIndeterminate: false,
        filterShow: false,
        tagsCheckAll: true,
        posts: [],
        totalTags: totalTags,
        filter: {
          timeDuration: 'all',
          tags: [],
          order: 'desc'
        }
      }
    },
    methods: {
      toggleFilterShow () {
        this.filterShow = !this.filterShow
      },
      showData () {
        console.log(this.filter)
      }
    },
    beforeRouteEnter: (to, from, next) => {
      Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/posts').then(function (res) {
        var posts = res.body.posts
        next(function (vm) {
          for (let i = 0; i < posts.length; i++) {
            vm.posts.splice(0, 0, posts[i])
          }
        })
      })
    }
  }
</script>
<style scoped>
.iconfont{
  font-size: 14px;
}
.posts-wp{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
  color:#48576a;
  overflow: hidden;
}
.breadcrumb-wp{
    height: 30px;
    display: flex;
    align-items: center;
    border: thin solid #ccc;
    margin-top: -1px;
    padding-left: 10px;
    background-color: #fff;
    position: relative;
    z-index: 10;
    box-shadow: 0 0 8px 2px rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
}
.post-filter-wp{
  height: 160px;
  overflow-x: hidden;
  overflow-y: auto;
  border: thin solid #ccc;
  margin-top: -1px;
  position: relative;
  top: 0;
  -webkit-transition: top .5s ease;
  -moz-transition: top .5s ease;
  transition: top .5s ease;
}
.post-filter-slider{
  position: relative;
  top: 0;
  -webkit-transition: top .5s ease;
  -moz-transition: top .5s ease;
  transition: top .5s ease;
}
.post-filter-slider.hidden{
  top: -160px;
}
.post-filter{
  padding: 5px 20px;
}
.post-filter>div{
  margin: 5px 0;
  border-bottom: thin solid #ccc;
  padding-bottom: 3px;
}
.filter-tags{
  display: flex;
  align-items: flex-start;
}
.tags-wp{
  display: flex;
  flex-wrap: wrap;
}
.el-checkbox+.el-checkbox {
  margin-right: 15px;
  margin-left: 0;
}
.check-all{
  margin-left: 3px;
  margin-right: 15px;
}
.fliter-close{
  position: relative;
  top: -1px;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  width: 100%;
  border: thin solid #ccc;
   text-align: center;
   -webkit-transition: all .5s ease;
   -moz-transition: all .5s ease;
   transition: all .5s ease;
}
.fliter-close:hover{
  background-color: #f9fafc;
  cursor: pointer;
}

.close-text{
  display: inline-block;
  opacity: 0;
  transform: translateX(30px);
  -webkit-transform: translateX(40px);
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  transition: all .5s ease;
}
.fliter-close:hover .close-text{
  opacity: 1;
  transform: translateX(10px);
  -webkit-transform: translateX(10px);
}
.post-list{
  -webkit-transition: transform .5s ease;
  -moz-transition: transform .5s ease;
  transition: transform .5s ease;
  padding: 20px 40px;
  border: thin solid #ccc;
  margin-top: 40px;
}
.post-list.translateUp{
  transform: translateY(-160px);
  -webkit-transform: translateY(-160px);
}
.post-wp{
  margin: 20px 0;
}
.post-wp:not(:first-child)::before{
  content: '';
  height: 1px;
  display: block;
  background-color: #ccc;
  margin-bottom: 10px;
}
.post-upper{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-lower{
  width: 100%;
}
.post-poster{
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.post-poster img{
  width: 100px;
  height: 100px;
}
.post-brief{
  width: calc(100% - 100px);
}
.post-abstract{
  text-indent: 2em;
}
.post-meta{
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.post-meta time{
  margin: 5px 20px 5px 0;
}
.post-title{
  margin-bottom: 10px;
}
.post-title a{
  color: #48576a;
  font-size: 1.4em;
}
.post-title a:hover{
  text-decoration: underline;
  color: #000;
}
.tags{
}
.tags span {
  display: inline-block;
  margin:5px 5px 5px 0;
}
</style>
