<template>
  <el-row class="app-wp">
    <el-col :xs="12" :sm="6" :md="6" :lg="6" class="side-bar">
      <nav>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1"><i class="el-icon-menu"></i>主页</el-menu-item>
          <el-menu-item index="2"><i class="el-icon-setting"></i>文章</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>绘画集</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-setting"></i>Demo</el-menu-item>
          <el-menu-item index="5"><i class="el-icon-setting"></i>About</el-menu-item>
        </el-menu>
      </nav>
    </el-col>
    <el-col :xs="12" :sm="18" :md="18" :lg="18" class="content-wp">

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      author: 'fengcc'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
html, body, .app-wp{
  height: 100%;
}
.side-bar{
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #ccc;
}
.side-bar nav{
  width: 100%;
  text-align: right;
}
.content-wp{
  height: 100%;
}
.el-menu-item{
  padding-right: 40px;
}
</style>
