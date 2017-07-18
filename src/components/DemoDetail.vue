<template>
  <div class="demo-detail-wp">
    <div class="breadcrumb-wp">
        <span>当前位置：</span>
        <el-breadcrumb>
            <el-breadcrumb-item to="/demo">
                Demo列表
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="demo-wp">
        <h2>{{title}}</h2>
        <div class="demo-result">
            <iframe class="demo-iframe" :width="demoDetail.width" :height="demoDetail.height" :src="demoDetail.src" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
        </div>
        <div class="demo-text">
            {{demoDetail.text}}
        </div>
        <div class="demo-meta">
            <div>{{demoDetail.date}}</div>
        </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'demo',
    data () {
      return {
        demoDetail: {}
      }
    },
    computed: {
      title () {
        return this.$route.params.title
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('beforeRouteEnter')
      Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/demoDetail').then(function (res) {
        next(function (vm) {
          vm.demoDetail = res.body
        })
      })
    },
    beforeRouteUpdate (to, from, next) {
      console.log('beforeRouteUpdate')
      var title = to.$route.params.title
      this.title = title
      next()
    }
  }
</script>
<style scoped>
.breadcrumb-wp{
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: -1px;
    padding-left: 10px;
    font-size: 14px;
    background-color: #fff;
    position: relative;
    z-index: 10;
}
.demo-wp{
    background-color: #fff;
    margin-top: 20px;
    border-radius: 5px;
    padding: 20px;
}
h2{
    text-align: center;
    font-size: 1.2em;
    padding: 20px;
}
.demo-detail-wp{
    color: #48576a;
    padding-bottom: 40px;
}
.demo-iframe{
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 5px;
}
.demo-text{
    padding: 20px 0;
    line-height: 27px;
    text-indent: 2em;
}
.demo-meta{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
@media screen and (max-width: 768px) {
.demo-text{
    padding: 20px;
}
.demo-meta{
    padding: 0 20px;
}
}
</style>
