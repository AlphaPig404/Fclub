<template>
  <div class="about">
    <div class="msg">
      <h3><i class="icon"></i>个人信息</h3>
      <p>
        <span class="name">性别</span>
        <span class="value">男</span>
      </p>   
    </div>
    <div class="intro">
      <h3><i class="icon"></i>个人简介</h3>
      <p>今晚的夜色很美</p>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .about{
    text-align: left;
    padding-top: 0.1px;
  }
  .about .msg{
    margin-top: 20px;
  }
  
  .about h3{
    font-size: 16px;
  }
  .about h3 .icon{
    border-left: 4px solid #ffabc7;
    margin-right: 6px;
  }
  .about p{
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
  }
</style>