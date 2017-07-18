<template>
  <div>
    <el-collapse :accordion="true">
      <el-collapse-item title="关于本人" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="关于本网站" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="如何在一天之内学会前端" name="3">
        <div>做梦~</div>
      </el-collapse-item>
      <el-collapse-item title="有问题？请联系" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
    name: 'about'
  }
</script>
<style>
.el-collapse{
  border: none;
}
</style>
