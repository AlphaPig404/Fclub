<template>
  <div class="search">
    <div class="search-wrapper">
      <span class="text">全站搜索</span>
      <div class="input-wrapper">
        <input type="text" placeholder="请输入关键字">
        <i class="iconfont icon-sousuo"></i>
      </div>
    </div>
    <div class="search-keywords">
      <div class="title">大家都在搜</div>
      <div class="cells">
        <div class="cell" v-for="(word,key) in keywords" :key="key">
          {{word}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        keywords: ['银魂','王者荣耀','你的名字','大司马','fgo','欢迎来到实力至上主义的教室','asmr','暴走大事件']
      }
    },
  }
</script>

<style scoped>
  .search-wrapper{
    display: flex;
    height: 45px;
    background-color: #f25d8e;
    box-sizing: border-box;
    padding: 8px 12px 8px 0;
    align-items: center;
  }
  .search-wrapper .text{
    flex: 0 0 80px;
    color: #fff;
  }
  .search-wrapper .input-wrapper{
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
  }
  .search-wrapper .input-wrapper input{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    border-radius: 4px;
  }
  .icon-sousuo{
    position: absolute;
    top: 4px;
    left: 4px;
    font-size: 20px;
    color: #888;
  }
  .search-keywords{
    padding: 0 10px;
    text-align: left;
  }
  .search-keywords .title{
    height: 40px;
    line-height: 40px;
    color: #f25d8e;
    font-size: 16px;
  }
  .search-keywords .cell{
    display: inline-block;
    padding: 4px 6px;
    margin: 4px;
    color: #fff;
    background: #f25d8e;
    border-radius: 4px;
  }
</style>