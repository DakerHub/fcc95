<template>
  <div class="app-wp" :class="{ sideBarShow }">
    <div class="side-bar" :class="{ sideBarShow }">
      <div class="personal-info">
        <div class="personal-avatar">
          <img :src="personalInfo.avatarUrl" alt="fcc">
        </div>
        <div class="personal-info-line">
          <i class="iconfont icon-male2" title="男孩子"></i>
          <span class="name">{{personalInfo.name}}</span>
          <i class="iconfont icon-3" title="双子座"></i>
        </div>
        <div class="personal-info-line">
          <i class="iconfont icon-iconlocaltion"></i>
          <span class="city">{{personalInfo.city}}</span>
        </div>
      </div>
      <nav>
        <el-menu ref="navMenu" default-active="/home" class="el-menu-vertical-demo" @select="navSelect" :router="true">
          <el-menu-item index="/home"><i class="iconfont icon-home"></i>主页</el-menu-item>
          <el-menu-item index="/posts"><i class="iconfont icon-iconfont-momarticle"></i>文章</el-menu-item>
          <el-menu-item index="/photoWall"><i class="iconfont icon-pictureo"></i>绘画集</el-menu-item>
          <el-menu-item index="/demo"><i class="iconfont icon-code2"></i>Demo</el-menu-item>
          <el-menu-item index="/about"><i class="iconfont icon-about"></i>About</el-menu-item>
        </el-menu>
      </nav>
      <div class="contact">
        <div v-for="item in personalInfo.contact" class="contact-item">
          <!--if(item.link)  -->
          <a v-if="item.link" href="#" class="github-link" :title="item.title">
            <i :class="[item.iconClass]" v-if="item.iconClass"></i>
            <span v-if="item.text">{{item.text}}</span>
          </a>
          <!--if(item.link)  -->
          <i :class="item.iconClass"  v-if="item.content && item.iconClass"></i>
          <label v-if="item.content && item.showTitle && item.iconClass">{{item.title}}:</label>
          <span :title="item.title" v-if="item.content">{{item.content}}</span>
          <!--if(item.img) -->
          <label v-if="item.img && item.showTitle">{{item.title}}:</label>
          <img v-if="item.img" :src="item.img" alt="item.title" :class="item.imgClass">

        </div>
      </div>
    </div>
    <header class="header">
    <el-button @click="showSideBar" class="menu-btn">=</el-button>
    </header>
    <div class="cover" :class="{ sideBarShow }" @click="hideNav"></div>
    <div class="content-wp">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      activeRouter: '/home',
      sideBarShow: false,
      personalInfo: {
        name: 'PaDaker',
        avatarUrl: 'http://ostjp7jb4.bkt.clouddn.com/17-7-12/50931280.jpg',
        city: '深圳',
        isBoy: true,
        constellation: 'Gemini',
        contact: [
          {
            title: 'github',
            link: '#',
            iconClass: ['icon-github', 'iconfont']
          },
          {
            title: 'mail',
            content: '523246656@qq.com',
            iconClass: ['icon-mail', 'iconfont']
          }
        ]
      }
    }
  },
  methods: {
    navSelect (index) {
      this.hideNav()
    },
    hideNav () {
      var cover = document.getElementsByClassName('cover')[0]
      if (cover.style.display === 'block' || cover.style.display === '') {
        this.sideBarShow = false
        document.getElementsByTagName('body')[0].style['overflow-y'] = 'auto'
      }
    },
    showSideBar (e) {
      if (this.sideBarShow) {
        document.getElementsByTagName('body')[0].style['overflow-y'] = 'auto'
      } else {
        document.getElementsByTagName('body')[0].style['overflow-y'] = 'hidden'
      }
      this.sideBarShow = !this.sideBarShow
    }
  }
}
</script>

<style>
html, body, .app-wp{
  height: 100%;
  color: #fff;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{
  overflow-x: hidden;
}
.el-menu-item.is-active{
  color: #fff;
  background-color: #20a0ff;
}
a{
  text-decoration: none;
  color: #fff;
}
.iconfont{
  font-size: 18px;
}
.icon-male2{
  height: 14px;
}
.icon-3{
  height: 20px;
}
.menu-btn{
  display: none;
}
.side-bar{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #20A0FF;
  transition: left .5s;
}
.menu-btn{
  position: fixed;
  left: 10px;
  top: 2px;
  z-index: 1000;
}
.side-bar nav{
  width: 100%;
  text-align: right;
}
.side-bar nav .iconfont{
  margin-right: 10px;
}
.el-menu-item{
  padding-right: 40px;
  font-size: 18px;
}
.personal-info{
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
}
.personal-info-line{
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.personal-info-line .iconfont{
  margin: 0 10px;
}
.personal-avatar{
  width: 100px;
  height: 100px;
  border: 4px solid #fff;
  border-radius: 50%;
  overflow: hidden;
}
.personal-avatar img{
  width: 100px;
  height: 100px;
}
.github-link:hover{
  color: #000;
}
.github-link:active{
  color: #ccc;
}
.contact{
  flex: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 12px;
  width: 240px;
  padding-top: 10px;
  border-top: thin solid #fff;
}
.contact-item{
  margin: 5px 0;
  display: flex;
  align-items: baseline;
}
.header{
  width: calc(100% - 300px);
  height: 40px;
  position: fixed;
  top: 0;
  left: 300px;
  z-index: 99;
  border-bottom: thin solid #dcdcdc;
  background-color: #fff;
}
.content-wp{
  width: 600px;
  height: 0;
  padding-top: 40px;
  margin-left: 400px;
  color: #000;
  transition: margin .5s;
}
.cover{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: none;
}
/*大屏用户*/
@media screen and (min-width: 1300px) {
.content-wp{
  width: calc(70% - 300px);
  max-width: 800px;
}
}
/*窄屏*/
@media screen and (max-width: 1079px) {
.side-bar{
  left: -300px;
}
.content-wp{
  margin: 0 auto;
  transition: margin .5s;
}
.header{
  width: 100%;
  left: 0;
}
.side-bar.sideBarShow{
  left: 0;
}
.sideBarShow.cover{
  display: block;
}
.menu-btn{
  display: block;
}
}
@media screen and (max-width: 768px) {
.content-wp{
  width: calc(100% + 2px);
  transition: margin .5s;
  margin-left: -1px;
}

.post-list{
  border: none;
}
.header{
  width: 100%;
  left: 0;
}
}
/*小屏*/
@media screen and (max-height: 560px) {
.personal-avatar{
  display: none;
}
}
</style>
