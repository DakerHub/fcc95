<template>
    <div>
        <div class="breadcrumb-wp">
            <span>当前位置：</span>
            <el-breadcrumb>
            <el-breadcrumb-item to="/demo">
                Demo列表
            </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="demos-wp">
            <div class="demo-wp" v-for="(demo,index) in demos">
            <span class="demo-index">{{index+1}}</span>
            <a class="demo-title" href="#" @click.prevent="turnToDemo(demo.title)" :title="demo.title">{{demo.title}}</a>
            </div>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  var getData = false

  export default {
    name: 'demoList',
    data () {
      return {
        currentView: 'demoList',
        currentTitle: '',
        demos: []
      }
    },
    methods: {
      turnToDemo (title) {
        this.currentView = 'demoDetail'
        this.currentTitle = title
        this.$router.push({ path: '/demo/demoDetail/' + title })
      }
    },
    beforeRouteEnter: (to, from, next) => {
      if (!getData) {
        Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/demoList').then(function (res) {
          next(function (vm) {
            vm.demos = res.body.demos
            getData = true
          })
        })
      } else {
        next()
      }
    }
  }
</script>
<style scoped>
a{
  color: #48576a;
}
.breadcrumb-wp{
    height: 30px;
    display: flex;
    align-items: center;
    border: thin solid #ccc;
    margin-top: -1px;
    padding-left: 10px;
    font-size: 14px;
    background-color: #fff;
    position: relative;
    z-index: 10;
}
.demos-wp{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
}
.demo-index{
  display: block;
  float: left;
  font-size: 12px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background-color: #ccc;
  margin-right: 5px;
}
.demo-title{
  display: block;
  float: left;
  width: 130px;
  line-height: 20px;
  padding-right: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.demo-wp{
  flex-shrink: 0;
  margin: 10px 0;
}
.demo-wp:hover .demo-index{
  background-color: #20A0FF;
}
.demo-wp:hover .demo-title{
  color: #20A0FF;
  text-decoration: underline;
}
@media screen and (max-width: 564px) {
.demo-title{
  width: 80px;
}
.demos-wp{
  justify-content: space-between
}
}
@media screen and (max-width: 414px) {
.demo-title{
  width: 60px;
}
}
</style>
