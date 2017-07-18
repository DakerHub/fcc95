<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name: 'demo',
    beforeRouteEnter: (to, from, next) => {
      // ...
      next(function (vm) {
        var originMenu = vm.$parent.$refs.navMenu.activedIndex
        if (to.path.indexOf(originMenu) === -1) {
          vm.$parent.$refs.navMenu.activedIndex = '/demo'
        }
      })
    }
  }
</script>
<style scoped>

</style>
