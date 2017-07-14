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
            <span class="filter-time-title">时间段：</span>
            <el-radio-group v-model="filter.timeDuration" size="small">
              <el-radio :label="7">最近一周</el-radio>
              <el-radio :label="30">最近一个月</el-radio>
              <el-radio :label="90">最近三个月</el-radio>
              <el-radio :label="365">最近一年</el-radio>
              <el-radio :label="'all'">全部</el-radio>
            </el-radio-group>
          </div>
          <div class="filter-tags">
            <span>标<span class="opacity_0">占</span>签：</span>
            <el-checkbox-group v-model="filter.tags" class="tags-wp">
              <el-checkbox :label="tag" v-for="tag in totalTags" :key="tag">{{tag}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="filter-order">
            <el-radio-group v-model="filter.order">
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
            <h2 class="post-title"><a href="#" @click.prevent="turnToPost(post.title)">{{post.title}}</a></h2>
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
      <!--循环渲染文章end  -->
      <!--分页组件begin  -->
      <div class="pagination-wp">
        <el-pagination
          layout="prev, pager, next"
          :total="totalPostLength"
          :current-page.sync="filter.curPage"
          @current-change="changeCurrentPost">
        </el-pagination>
      </div>
      <!--分页组件end  -->
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  const totalTags = ['Vue1', 'JS1', 'node1', 'css1', 'html1', 'JS2']
  var loadResourceFinish = false
  export default {
    name: 'posts',
    data () {
      return {
        isIndeterminate: false,
        filterShow: false,
        tagsCheckAll: true,
        posts: [],
        totalPostLength: 0,
        totalTags: totalTags,
        filter: {
          timeDuration: 'all',
          tags: [],
          order: 'desc',
          curPage: 1
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
        console.log('changeCurrentPost------------------------------------')
        if (turnToPage1) {
          this.filter.curPage = 1
        }
        this.$http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/posts', {
          params: this.filter
        }).then(function (res) {
          // 替换新的文章
          console.log(res)
          var posts = res.body.posts
          this.posts = []
          for (let i = 0; i < posts.length; i++) {
            this.posts.splice(0, 0, posts[i])
          }
        })
      },
      turnToPost (title) {
        this.$router.push({path: '/post/' + title})
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('beforeRouteEnter------------------------------------')
      if (!loadResourceFinish) {
        Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/posts').then(function (res) {
          var posts = res.body.posts
          var total = res.body.total
          next(function (vm) {
            var originMenu = vm.$parent.$refs.navMenu.activedIndex
            if (to.path.indexOf(originMenu) === -1) {
              vm.$parent.$refs.navMenu.activedIndex = to.path
            }
            vm.totalPostLength = total
            for (let i = 0; i < posts.length; i++) {
              vm.posts.splice(0, 0, posts[i])
            }
          })
        })
        loadResourceFinish = true
      } else {
        next()
      }
    }
    // ,
    // beforeRouteUpdate (to, from, next) {
    //   console.log('beforeRouteUpdate------------------------------------')
    //   this.filter = to.query
    //   if (!this.filter.tags) {
    //     this.filter.tags = []
    //   }
    //   // el-pagination组件接受的参数类型为number，所以必须转换一下
    //   if (to.query && to.query.curPage) {
    //     this.filter.curPage = parseInt(to.query.curPage)
    //   } else {
    //     this.filter = {
    //       timeDuration: 'all',
    //       tags: [],
    //       order: 'desc',
    //       curPage: 1
    //     }
    //   }
    //   next()
    // }
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
.filter-time{
  display: flex;
  align-items: flex-start;
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
  top: -1px;
  box-sizing: border-box;
  padding: 5px 0;
  line-height: 20px;
  width: 100%;
  border: thin solid #ccc;
  text-align: center;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  transition: all .5s ease;
  background: url(../assets/tuzi.png) no-repeat;
  background-position-x: -200px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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
  border: thin solid #ccc;
  margin-top: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
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
.tags{
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
