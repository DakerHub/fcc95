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
      })
    }
  }
</script>
<style scoped>

</style>
