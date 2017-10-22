<template>
  <div class="my-iframe">
    <!-- <scroll :data="refresh_arr"> -->
      <!-- <div> -->
        <iframe :src="iframe_src" frameborder="0" :scrolling="switchScroll()"></iframe>
      <!-- </div> -->
    <!-- </scroll> -->
  </div>
</template>

<script>
  import Scroll from '@/components/scroll'
  export default {
    name: 'my-iframe',
    data() {
      return {
        refresh_arr: [],
        iframe_src: ''
      }
    },
    components:{
      Scroll
    },
    mounted(){
      this.iframe_src = this.$route.query.src
    },
    methods:{
      isAndroid(){
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        return isAndroid
      },
      switchScroll(){
        return this.isAndroid()?'':'no'
      }
    }
  }
</script>

<style scoped>
  .my-iframe{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    overflow: auto;
    background-color: #f4f4f4;
    -webkit-overflow-scrolling: touch;
  }
  .my-iframe .scroll-wrapper{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .my-iframe iframe{
     width: 1px;
     min-width: 100%;
     min-height: 100%;
  }
</style>