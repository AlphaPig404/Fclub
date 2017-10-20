<template>
  <div class="my-iframe">
    <!-- <scroll :data="refresh_arr"> -->
      <!-- <div> -->
        <iframe :src="iframe_src" frameborder="0" scrolling="no"></iframe>
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