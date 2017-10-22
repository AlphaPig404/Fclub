<template>
  <div class="top-bar">
    <i class="iconfont icon-fanhui" v-if="$route.meta.return" @click="_=>{this.$router.goBack()}">
      <span class="text return">返回</span>
    </i>
    <i class="iconfont icon-guanbi" v-if="$route.meta.cancel" @click="_=>{this.$router.go(-1)}">
      <span class="text cancel">取消</span>
    </i>
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
  .top-bar .iconfont{
    position: absolute;
    top: 0px;
    left: 10px;
  }
  .top-bar .icon-guanbi{
    font-size: 13px !important;
  }
  .top-bar .icon-guanbi .text{
    font-size: 16px;
    margin: 4px
  }
  .top-bar .confirm{
    position: absolute;
    top: 0px;
    right: 10px;
  }
</style>