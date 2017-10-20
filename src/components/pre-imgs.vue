<template>
  <transition name="fade">
    <div class="pre-imgs" v-show="showFlag">
      <div class="img-group">
        <slide :data="imgs" :pageIndex="page_index" @getPageIndex="getIndex">
          <div v-for="(slide,index) in imgs" :key="index" @click="hiddenPre">
            <img :src="slide" alt="">
          </div>
        </slide>
        <div class="page-index">{{nowIndex||page_index+1}}/{{imgs.length}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
  
  import Slide from '@/components/slide'
  import {mapGetters} from 'vuex'

  export default {
    name: 'pre-imgs',
    computed:{
      ...mapGetters({
        showFlag: 'getPreShowState',
        imgs: 'getPreShowImgs',
        page_index: 'getPageIndex'
      })
    },
    components:{
      Slide
    },
    data() {
      return {
        nowIndex: null
      }
    },
    methods:{
      hiddenPre(){
        this.nowIndex = null
        this.$store.dispatch('hidePre')
        this.$store.dispatch('setBackGroundColor',{backgroundColor:'#fb80a8'})
      },
      getIndex(index){
        this.nowIndex = index+1
      }
    }
  }
</script>

<style scoped>
  .pre-imgs{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #333;
    z-index: 1000;
  }
  .img-group{
    position: relative;
  }
  .page-index{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(51,51,51,.7);
    font-size: 20px;
    font-weight: bold;
    
    color: #fff;
  }
  /* .fade-enter-active{
    transition: opacity 0.3s
  }
  .fade-enter{
    opacity: 0
  } */
</style>