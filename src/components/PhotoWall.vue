<template>
  <div class="phtot-wall-wp">
    <h2>在拿起画笔的时候，世界都安静了</h2>
    <div class="photo-wall">
      <div v-for="category in photoCategory">
        <h3 class="cate-title">{{category.cateName}}</h3>
        <div class="photos-wp">
          <div v-for="(photos,index) in category.photos" class="photo-wp" @click="showBigPhoto(category.cateName,index)">
            <img :src="photos.thumb" alt="" class="photo">
            <h3 class="photo-title">{{photos.title}}</h3>
          </div>
        </div>
      </div>
    </div>
    <lightbox :images="images" :showLightBox="false" ref="lightbox"></lightbox>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Lightbox from 'vue-image-lightbox' // https://github.com/pexea12/vue-image-lightbox

  export default {
    name: 'photoWall',
    data () {
      return {
        photoCategory: {},
        images: []
      }
    },
    methods: {
      showBigPhoto (cateName, index) {
        for (var n in this.photoCategory) {
          if (this.photoCategory[n].cateName === cateName) {
            this.images = this.photoCategory[n].photos
            break
          }
        }
        this.$refs.lightbox.showImage(index)
      },
      sortDate (dateArr, photoCategory) {
        var sortCate = []
        dateArr.sort(function (v1, v2) {
          var year1 = parseInt(v1.split('.')[0])
          var mouth1 = parseInt(v1.split('.')[1])
          var year2 = parseInt(v2.split('.')[0])
          var mouth2 = parseInt(v2.split('.')[1])
          if (year1 > year2) {
            return -1
          } else if (year1 === year2) {
            return mouth2 - mouth1
          } else {
            return 1
          }
        })
        for (var n in dateArr) {
          var cateName = dateArr[n]
          sortCate.push({
            cateName,
            photos: photoCategory[cateName]
          })
        }
        return sortCate
      }
    },
    components: {
      Lightbox
    },
    beforeRouteEnter: (to, from, next) => {
      // ...
      Vue.http.get('https://www.easy-mock.com/mock/596642c558618039284c74df/fcc95/photos').then(function (res) {
        var photoCategory = res.body
        next(function (vm) {
          var originMenu = vm.$parent.$refs.navMenu.activedIndex
          var dateArr = []
          if (to.path.indexOf(originMenu) === -1) {
            vm.$parent.$refs.navMenu.activedIndex = '/photoWall'
          }
          for (var n in photoCategory) {
            dateArr.push(n)
          }
          dateArr = vm.sortDate(dateArr, photoCategory)
          vm.photoCategory = dateArr
          console.log(dateArr)
        })
      })
    }
  }
</script>
<style scoped>
h2{
  font-size: 1.2em;
  font-weight: 500;
  color: #0e6bb5;
}
.cate-title{
  font-size: 1.2em;
  color: #06365a;
  font-weight: bold;
  padding: 10px 0;
}
.phtot-wall-wp{
  padding: 20px;
}
.photo-wp{
  width: 160px;
  margin: 5px;
}
.photos-wp{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.photo{
  width: 160px;
  height: 160px;
}

@media screen and (max-width: 1079px) {
.photo{
  width: 120px;
  height: 120px;
}
.photo-wp{
  width: 120px;
}
}
@media screen and (max-width: 768px) {
.photo{
  width: 100px;
  height: 100px;
}
.photo-wp{
  width: 100px;
}
}
</style>

<style>
.vue-lb-container{
  z-index: 1000;
}
</style>
