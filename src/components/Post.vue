<template>
  <div>
    <div class='post-wp'>
      <div class='breadcrumb-wp'>
        <span>当前位置：</span>
        <el-breadcrumb>
          <el-breadcrumb-item to='/posts'>
            文章列表
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            文章详情
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class='post' :key='postId'>
        <h2 class='post-title'>{{post.name}}</h2>
        <div class='post-content'>
          <vue-markdown :source="post.content" :toc="true" :key="postId"></vue-markdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import API from '../assets/js/API.js'
  import VueMarkdown from 'vue-markdown'
  import './../assets/js/highlight.pack.js'
  import './../assets/css/atom-one-dark.css'

  export default {
    name: 'post',
    data () {
      return {
        post: {
          content: '',
          time: '',
          id: '',
          name: '',
          poster_src: '',
          tagsId: '',
          visited: ''
        }
      }
    },
    components: {
      VueMarkdown
    },
    computed: {
      postId () {
        return this.$route.params.id
      }
    },
    methods: {
    },
    beforeRouteEnter (to, from, next) {
      Vue.http.get(API.getPost, {
        params: {
          id: to.params.id
        }
      }).then(function (res) {
        next(function (vm) {
          vm.post.name = res.body.post.name
          vm.post.content = res.body.post.content
          Vue.nextTick(function () {
            var e = document.querySelectorAll('pre code')
            var nodes = Array.prototype.slice.call(e, 0)
            for (let i = 0; i < nodes.length; i++) {
              /* eslint-disable no-undef */
              hljs.highlightBlock(nodes[i])
            }
          })
          var originMenu = vm.$parent.$refs.navMenu.activedIndex
          if (to.path.indexOf(originMenu) === -1) {
            vm.$parent.$refs.navMenu.activedIndex = '/posts'
          }
        })
      })
    }
  }

</script>
<style scoped>
  .post-wp {
    font-size: 13px;
    color: #48576a;
  }

  h2 {
    text-align: center;
    font-size: 2em;
    font-weight: 500;
    color: #25354a;
  }

  .breadcrumb-wp {
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: -1px;
    padding-left: 10px;
    background-color: #fff;
    position: relative;
    z-index: 10;
  }

  .post {
    margin: 20px 0;
    border-radius: 5px;
    padding: 20px 45px;
    background-color: #fff;
  }

  .post-content {
    font-size: 16px;
    line-height: 27px;
    text-indent: 2em;
  }
  
  .post-content::before {
    content: '';
    height: 1px;
    display: block;
    margin: 20px 0;
    background-color: #ccc;
  }
</style>
<style>
  .post-content pre {
    overflow: auto;
  }
  .post-content img {
    width: 510px;
  }
</style>
