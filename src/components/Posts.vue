<template>
  <div class="posts-wp">
    <div class="breadcrumb-wp">
      <span>当前位置：</span>
      <el-breadcrumb>
        <el-breadcrumb-item>
          文章列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="post-filter-slider" :class="filterShow?'':'hidden'">
      <div class="post-filter-wp">
        <div class="post-filter">
          <div class="filter-time">
            <span class="filter-title">时间段：</span>
            <el-radio-group v-model="filter.timeDuration" size="small">
              <el-radio :label="7">最近一周</el-radio>
              <el-radio :label="30">最近一个月</el-radio>
              <el-radio :label="90">最近三个月</el-radio>
              <el-radio :label="365">最近一年</el-radio>
              <el-radio :label="'all'">全部</el-radio>
            </el-radio-group>
          </div>
          <div class="filter-tags">
            <span class="filter-title">标<span class="opacity_0">占</span>签：</span>
            <el-checkbox-group v-model="filter.tags" class="tags-wp">
              <el-checkbox :label="key" v-for="(val,key) in tagIdMap" :key="key">{{val}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="filter-order">
            <el-radio-group v-model="filter.dir">
              <el-radio :label="'desc'">降序</el-radio>
              <el-radio :label="'asc'">升序</el-radio>
            </el-radio-group>
          </div>
          <el-button @click="filtrate(true)">筛选</el-button>
        </div>
      </div>
      <div class="fliter-close" @click="toggleFilterShow">
        <i :class="filterShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        <span class="close-text" v-show="!filterShow">展开筛选条件</span>
        <span class="close-text" v-show="filterShow">隐藏筛选条件</span>
      </div>
    </div>
    <div class="post-list" :class="filterShow?'':'translateUp'">
      <!--循环添加文章begin  -->
      <div class="post-wp" v-for="post in posts">
        <article class="post-upper">
          <div class="post-brief">
            <h2 class="post-title"><a href="#" @click.prevent="turnToPost(post.id)">{{post.name}}</a></h2>
            <div class="post-abstract">
              <p>{{post.abstract}}</p>
            </div>
          </div>
          <div class="post-poster">
            <img :src="post.posterUrl" alt="">
          </div>
        </article>
        <div class="post-meta post-lower">
          <time><i class="iconfont icon-timefull"></i>{{post.time}}</time>
           <div class="tags">
            <span v-for="tag in post.tags"><i class="iconfont icon-tag"></i>{{tag}}</span>
          </div> 
        </div>
      </div>
      <!--循环渲染文章end  -->
      <!--分页组件begin  -->
      <div class="pagination-wp">
        <el-pagination
          layout="prev, pager, next"
          :total="totalPostLength"
          :small="isSmall"
          :current-page.sync="filter.page"
          @current-change="changeCurrentPost">
        </el-pagination>
      </div>
      <!--分页组件end  -->
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import API from './../assets/js/API.js'
  var loadResourceFinish = false
  export default {
    name: 'posts',
    data () {
      var winW = window.innerWidth
      return {
        isIndeterminate: false,
        filterShow: false,
        tagsCheckAll: true,
        posts: [],
        tagIdMap: null,
        totalPostLength: 0,
        totalTags: [],
        isSmall: winW < 368,
        filter: {
          timeDuration: 'all',
          tags: [],
          dir: 'desc',
          page: 1,
          numPerPage: 10
        }
      }
    },
    methods: {
      toggleFilterShow () {
        this.filterShow = !this.filterShow
      },
      showData () {
        console.log(this.filter)
      },
      changeCurrentPost (cur) {
        this.filtrate(false)
      },
      filtrate (turnToPage1) {
        if (turnToPage1) {
          this.filter.page = 1
        }
        this.getPosts()
      },
      turnToPost (title) {
        this.$router.push({path: '/post/' + title})
      },
      id2TagName (id) {
        var idArr = id.split('|')
        var tagArr = []
        var tagsMap = this.tagIdMap
        if (idArr.length > 0) {
          for (let i = 0; i < idArr.length; i++) {
            var tagId = idArr[i]
            var tagName = tagsMap[tagId]
            if (tagName) {
              tagArr.push(tagName)
            }
          }
        }
        return tagArr
      },
      getPosts () {
        const self = this
        Vue.http.get(API.getPosts, {params: this.filter}).then(function (res) {
          var posts = res.body.posts
          for (let i = 0; i < posts.length; i++) {
            var tagId = posts[i]['tagsId']
            posts[i]['tags'] = self.id2TagName(tagId)
          }
          console.log(posts)
          var total = parseInt(res.body.total)
          self.totalPostLength = total
          self.posts = posts
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!loadResourceFinish) {
        Vue.http.get(API.getTags).then(function (res) {
          var tags = res.body.tags
          next(function (vm) {
            // 将返回的tag数组转换为id和name对应的map
            var map = {}
            for (let i = 0; i < tags.length; i++) {
              var tag = tags[i]
              map[tag.id] = tag.tagName
              vm.totalTags.push(tag.tagName)
            }
            vm.tagIdMap = map
          })
        })
        loadResourceFinish = true
      } else {
        next()
      }
    },
    created () {
      this.getPosts()
    }
  }
</script>
<style scoped>
.opacity_0{
  opacity: 0;
}
.iconfont{
  font-size: 14px;
}
.posts-wp{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
  color:#48576a;
  height: 0;
}
.breadcrumb-wp{
    height: 30px;
    display: flex;
    align-items: center;
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
  background-color: #fff;
  border-radius: 5px;
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
.filter-time{
  display: flex;
  align-items: flex-start;
}
.filter-title{
  width: 100px;
  text-align: right;
  flex-shrink: 0;
  width: 60px;
}
.tags-wp{
  display: flex;
  flex-wrap: wrap;
}
.check-all{
  margin-left: 3px;
  margin-right: 15px;
}
.fliter-close{
  position: relative;
  box-sizing: border-box;
  padding: 5px 0;
  line-height: 20px;
  width: 100%;
  text-align: center;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  transition: all .5s ease;
  background: url(../assets/tuzi.png) no-repeat;
  background-position-x: -200px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 8px 2px rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
}
.fliter-close:hover{
  background-position-x: 0;
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
  margin-top: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
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
  border: none;
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
  width: calc(100% - 110px);
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
.el-radio{
  margin-right: 15px;
  margin-left: 0;
}
.el-checkbox{
  margin-right: 15px;
  margin-left: 0;
}
.tags span {
  display: inline-block;
  margin:5px 5px 5px 0;
}
.pagination-wp{
  text-align: center;
  border-top: thin solid #ccc;
  padding-top: 10px;
}
@media screen and (max-width: 768px) {
.fliter-close:hover{
  background-position-x: -70px;
}
.post-list{
  border: none;
}
}
</style>
