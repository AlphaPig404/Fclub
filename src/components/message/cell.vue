<template>
  <div class="cell">
    <div class="icon-wrapper">
      <i class="iconfont" :class="'icon-'+data.icon"></i>
    </div>
    <div class="text-wrapper">
      <span class="text">{{data.text}}</span>
      <i class="iconfont icon-return"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cell',
    props:['data'],
    data() {
      return {
        key: 'value'
      }
    },
  }
</script>

<style scoped>
  .cell{
    display: flex;
    height: 50px;
    line-height: 50px;
    align-items: center;
    font-size: 16px;
    padding: 0 10px;
    justify-content: space-between;
  }
  
  .cell .icon-wrapper{
    flex: 0 0 50px;
  }
  .cell .text-wrapper{
    display: flex;
    flex: 1;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
  }

  .iconfont{
    vertical-align: middle;
    font-size: 20px !important;
  }
  .icon-youjian{
    color: #4fbbd6;
    font-size: 36px !important;
  }
  .icon-communicate{
    color: #37b87f;
    font-size: 32px !important;
  }
  .icon-zan1{
    color: #ffa202;
    font-size: 36px !important;
  }
</style>