<template>
  <div class="bottom-bar">
    <router-link tag='div' class="bar" v-for="(item,key) in bars" :key="key" :to="item.to">
      <i class="iconfont" :class="'icon-'+item.icon"></i>
      <p class="text">{{item.text}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'bottom-bar',
  data() {
    return {
      bars: [
        {icon: 'zhuye', text: '追番',to:'/index'},
        {icon: 'xiaoxi', text: '消息',to:'/message'},
        {icon: 'icontiezi', text: '微帖',to:'/posts'},
        {icon: 'wode', text: '我的',to:'/me'}
      ]
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 45px;
    align-items: center;
    text-align: center;
    background-color: #fff;
    border-top: 1px solid #f4f4f4;
  }
  .bar{
    flex: 1;
  }
  .bar.router-link-active{
    color: #f25d8e;
  }
  .bar .text{
    margin-top: 4px;
  }
</style>