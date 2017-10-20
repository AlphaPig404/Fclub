<template>
  <div class="loading" v-show="showFlag">
    <span class="loading-icon"></span>
    <span class="loading-text">正在加载中...</span>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props:{
      showFlag: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .loading{
    height: 40px;
    line-height: 40px;
  }
  .loading .loading-icon{
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-top: -4px;
    background-image: url(../assets/imgs/loading.gif);
    background-size: contain;
  }

</style>