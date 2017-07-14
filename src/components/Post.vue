<template>
  <div>
    <div class="post-wp">
      <div class="breadcrumb-wp">
        <span>当前位置：</span>
        <el-breadcrumb>
          <el-breadcrumb-item to="/posts">
            文章列表
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            文章详情
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="post">
        <h2 class="post-title">{{post.postTitle}}</h2>
        <div class="post-content">
          {{post.postContent}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'post',
    data () {
      return {
        post: {
          postTitle: this.$route.params.title,
          postContent: '',
          postDate: ''
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/post', {
        params: {
          title: to.params.title
        }
      }).then(function (res) {
        next(function (vm) {
          console.log(vm.$route)
          vm.post.postContent = res.body.postContent
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
.post-wp{
  font-size: 13px;
  color: #48576a;
}
h2{
  text-align: center;
  font-size: 2em;
  font-weight: 500;
  color: #25354a;
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
}
.post{
  margin: 20px 0;
  border: thin solid #ccc;
  border-radius: 5px;
  padding: 20px 45px;
}
.post-content{
  font-size: 16px;
  line-height: 27px;
  text-indent: 2em;
}
.post-content::before{
  content: '';
  height: 1px;
  display: block;
  margin: 20px 0;
  background-color: #ccc;
}
</style>
