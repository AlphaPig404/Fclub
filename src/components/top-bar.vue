<template>
  <div class="top-bar">
    <i class="iconfont icon-fanhui" v-if="$route.meta.return" @click="_=>{this.$router.go(-1)}">返回</i>
    <p class="title">{{$route.meta.title}}</p>
    <span class="confirm" v-if="$route.meta.confirm" @click="confirm">确定</span>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  methods:{
    confirm(){
      // this.bus.$emit('confirmFromTopBar',this.$route.path)
    }
  }
}
</script>

<style scoped>
  .top-bar{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 40px;

    background-color: #fb80a8;
    line-height: 45px;
    overflow: hidden;
    color: #fff;
    font-size: 16px;
  }
  .top-bar .title{
    font-size: 18px;
    font-weight: bold;
  }
  .top-bar .icon-fanhui{
    position: absolute;
    top: 0px;
    left: 10px;
  }
  .top-bar .confirm{
    position: absolute;
    top: 0px;
    right: 10px;
  }
</style>